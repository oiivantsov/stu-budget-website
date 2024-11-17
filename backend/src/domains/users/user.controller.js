import DAO from "../../services/daos/index.js";
import objectContainsKeys from "../../utils/objectContainsKeys.js";


const { UserDAO } = DAO;
const dao = new UserDAO();

export const getOneById = async (req, res) => {
    const id = req.params.id;

    let user = null;
    try {
        user = await dao.findOneById(id);
    } catch (CastError) {
        res.status(400).json({ msg: `${id} is not a valid ObjectId` });
        return;
    }

    if (user === null) {
        res.status(404).json({ msg: `User with id ${id} not found` });
        return;
    }

    res.json(await dao.findOneById(id));
};

export const getAll = async (_, res) => {
    res.json(await dao.findAll());
};


export const createUser = async (req, res) => {
    try {
        const newUser = await dao.persist(req.body);
        res.status(200).json(newUser);
    } catch (ValidationError) {
        // Missing fields
        const error = ValidationError;

        const requiredFields = [
            "username",
            "password",
            "email",
            "reviews",
            "favorites"
        ];
        const missingFields = objectContainsKeys(error.errors, requiredFields);

        let msg = "Missing fields from request body: ";
        missingFields.forEach(field => msg += `${field} `);

        res.status(400).json({ msg: msg });
        return;
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await dao.update(req.params.id, req.body);

        // Valid id but no user with that id
        if (updatedUser.matchedCount === 0) {
            res.status(404).json({ msg: `No user found with id ${req.params.id}` });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (ValidationError) {
        // Invalid id
        res.status(400).json({ msg: "Invalid id" });

    }
};

export const deleteUser = async (req, res) => {
    try {
        const daoResponse = await dao.delete(req.params.id);
        if (daoResponse.deletedCount === 0) {
            res.status(404).json({ msg: `No user found with id ${req.params.id}` });
            return;
        }
        res.status(204).end();
        return;
    } catch (ValidationError) {
        res.status(400).json({msg: "Invalid id"});
        return;
    }
};
