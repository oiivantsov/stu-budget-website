import jwt from "jsonwebtoken";
import UserDAO from "../services/dao/UserDAO.js"

const userDao = new UserDAO();

const auth = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"});
    }

    const token = authorization.split(" ")[1];

    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await userDao.findOneById(id);
        next();
    } catch (error) {
        console.error("Error in auth: error", error);
        res.status(401).json({error: "Request is not authorized"});
    }
}


export default auth;