/*
* Fairly empty for now, more to come when database is running
* and/or we have restaurants being added by users or through an API.
*/

"use strict";

import DAO from "../services/daos/index.js";
import { getDistanceBetweenCoords } from "./distanceBetweenCoords.js";


const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getDistanceToRestaurant = async (coords, restaurantId) => {
    const restaurant = await dao.findOneById(restaurantId);

    const distance = getDistanceBetweenCoords(coords, restaurant.coordinates);

    return distance;
};
