"use strict";

import RestaurantDAO from "./../services/daos/mongodb/RestaurantDAO.js";
import UserDAO from "./../services/daos/mongodb/UserDAO.js";


const restaurantDao = new RestaurantDAO();
const userDao = new UserDAO();


export const verifyUserId = async userId => {
    try {
        if (await userDao.findOneById(userId)) {
            return "found";
        } else {
            return "not found";
        }
    } catch (CastError) {
        return "invalid";
    }
};


export const verifyRestaurantId = async restaurantId => {
    try {
        if (await restaurantDao.findOneById(restaurantId)) {
            return "found";
        } else {
            return "not found";
        }
    } catch (CastError) {
        return "invalid";
    }
};
