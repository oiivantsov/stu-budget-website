"use strict";

import RestaurantDAO from "../services/dao/RestaurantDAO.js";
import UserDAO from "../services/dao/UserDAO.js";
import Tracer from "./tracer.js";

const ERROR = "VERIFY_ERROR";

Tracer.register(ERROR);

const restaurantDao = new RestaurantDAO();
const userDao = new UserDAO();


// export const verifyUserId = async userId => {
//     try {
//         if (await userDao.findOneById(userId)) {
//             return "found";
//         } else {
//             return "not found";
//         }
//     } catch (CastError) {
//         return "invalid";
//     }
// };


// export const verifyRestaurantId = async restaurantId => {
//     try {
//         if (await restaurantDao.findOneById(restaurantId)) {
//             return "found";
//         } else {
//             return "not found";
//         }
//     } catch (CastError) {
//         return "invalid";
//     }
// };

export const verifyUserId = async (userId, res) => {
    try {
        const found = await userDao.findOneById(userId);
        if (found) {
            return;
        } else {
            Tracer.error(ERROR, {name:"NotFound", message:"Could not find userid in database"});
            return res.status(404).json({msg:"No user with id found"});
        }
    } catch (e) {
        Tracer.error(ERROR, {name:"TypeError", message:"Bad userid type"});
        return res.status(400).json({msg:"Bad userid type"});
    }
};

export const verifyRestaurantId = async (restaurantId, res) => {
    try {
        const found = await restaurantDao.findOneById(restaurantId);
        if (found) {
            return;
        } else {
            Tracer.error(ERROR, {name:"NotFound", message:"Could not find restaurantid in database"});
            return res.status(404).json({msg:"No restaurant with id found"});
        }
    } catch (e) {
        Tracer.error(ERROR, {name:"TypeError", message:"Bad restaurantid type"});
        return res.status(400).json({msg:"Bad restaurantid type"});
    }
};