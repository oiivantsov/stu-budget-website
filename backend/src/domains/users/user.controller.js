import DAOs from "../../services/dao/index.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const {UserDAO} = DAOs;
const dao = new UserDAO();

export const getOneById = async (req, res) => {
    const id = req.params.id;

    let user = null;
    try {
        user = await dao.findOneById(id);
    } catch (CastError) {
        res.status(400).json({msg: `${id} is not a valid ObjectId`});
        return;
    }

    if (user === null) {
        res.status(404).json({msg: `User with id ${id} not found`});
        return;
    }

    res.json(await dao.findOneById(id));
};

export const getAll = async (_, res) => {
    res.json(await dao.findAll());
};


export const registerUser = async (req, res) => {
    try {
        const newUser = await dao.register(req.body);

        const token = jwt.sign({id: newUser["_id"]}, process.env.JWT_SECRET);

        res.status(201).json({id: newUser["_id"], token});
    } catch (error) {
        console.error("Error in POST /user/register", error);

        if (error.message === "Internal server error") {
            return res.status(500).json({error: error.message});
        }

        return res.status(400).json({error: error.message});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({msg: "All fields are required"});
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({msg: "Invalid email address"});
    }

    const user = await dao.findOneByEmail(email);

    if (!user) {
        return res.status(404).json({msg: `User with email ${email} not found`});
    }

    if (! await bcrypt.compare(password, user.password)) {
        return res.status(400).json({msg: "Password is incorrect"});
    }

    const token = jwt.sign({id: user["_id"]}, process.env.JWT_SECRET);

    return res.status(200).json({id: user["_id"], token});
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await dao.update(req.params.id, req.body);

        // Valid id but no user with that id
        if (updatedUser.matchedCount === 0) {
            res.status(404).json({msg: `No user found with id ${req.params.id}`});
            return;
        }

        res.status(200).json(updatedUser);
    } catch (ValidationError) {
        // Invalid id
        res.status(400).json({msg: "Invalid id"});

    }
};

export const deleteUser = async (req, res) => {
    try {
        const daoResponse = await dao.delete(req.params.id);
        if (daoResponse.deletedCount === 0) {
            res.status(404).json({msg: `No user found with id ${req.params.id}`});
            return;
        }
        res.status(204).end();

    } catch (ValidationError) {
        res.status(400).json({msg: "Invalid id"});

    }
};
