import DAO from "../../services/daos/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";

const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = async (req, res) => {
    try {
        res.json(await dao.findAll());
    } catch ({name, message}) {
        res.status(500).json({msg:"Internal server error"});
    }
}

export const getById = async (req, res) => {
    try {
        res.json(await dao.findOneById(req.body.id));
    } catch ({name, message}) {
        res.status(500).json({msg:"Internal server error"});
    }
}

export const getByCity = async (req, res) => {
    try {
        const restaurants = await dao.findByCity(req.params.city.replace(" ", ""));
        if (restaurants.length > 0) res.json(restaurants);
        else res.status(404).send();
    } catch ({name, message}) {
        res.status(500).json({msg:"Internal server error"});
    }
}

export const getNearby = async (req, res) => {
    if (userStreet === undefined || userCity === undefined || nearbyLimit === undefined) res.status(400).json({ msg: "One of these parameters is missing from request: street, city, limit." });
    let nearby = [];

    try {
        // User info
        const userStreet = req.params.street.replace(" ", "").toLowerCase();
        const userCity = req.params.city.replace(" ", "").toLowerCase();
        const nearbyLimit = Number(req.params.limit);

        // Disabled to save on api requests, tested and working
        //const userCoords = await getCoordinates(userStreet, userCity);
        const userCoords = { lat: 60.17061377899731, long: 24.941133275874176 };

        // Get restaurants by city
        let restaurants = await dao.findByCity(req.params.city.replace(" ", ""));

        if (restaurants.length < 1) res.status(404).send();

        // Calculate distances
        // For-loop used on purpose instead of forEach.
        // Awaiting not possible inside of forEach.
        for (let i = 0; i < restaurants.length; i++) {
            const responseObj = {restaurant: restaurants[i]};
            responseObj.distance = getDistanceBetweenCoords(userCoords, restaurants[i].coordinates);

            if (responseObj.distance <= nearbyLimit) nearby.push(responseObj);
        }

        nearby = nearby.sort((next, prev) => next.distance - prev.distance);
        res.json(nearby);
    } catch ({name, message}) {
        res.status(500).send({msg:"Internal server error"});
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await dao.findCommentsById(req.params.restaurantId);
        if (reviews) res.json(reviews);
        else res.status(404).send();
    } catch ({name, message}) {
        if (message == "TypeError") res.status(400).json({msg:"Incorrect input data"});
        else res.status(500).json({msg:"Internal server error"});
    }
}

export const addReview = async (req, res) => {
    if (!req.body.comment || !req.body.rating || !req.body.restaurantId) {
        res.status(400).json({msg:"One of review parameters is missing"});
        return;
    }
    if (isNaN(Number(req.body.rating))) {
        res.status(400).json({msg:"Rating must be a number"});
        return;
    }

    try {
        const user = {_id:"673c7e0099784abcd6d256ee"}; // For testing purposes, will be replaced by jwt check when the final db form is decided
        const { rating, comment, restaurantId } = req.body;
        const restaurant = await dao.addReview(restaurantId, user._id, rating, comment);
        res.status(201).json(restaurant);
    } catch ({name, message}) {
        if (message == "TypeError") res.status(400).json({msg:"Incorrect input data"});
        else res.status(500).json({msg:"Internal server error"});
    }
}

export const deleteReview = async (req, res) => {
    if (!req.body.commentId || !req.body.restaurantId) {
        res.status(400).json({msg:"One of delete parameters is missing"});
        return;
    }

    try {
        const user = {_id:"673c7e0099784abcd6d256ee"}; // For testing purposes, will be replaced by jwt check when the final db form is decided
        const ok = await dao.deleteReview(req.body.restaurantId, req.body.commentId);
        if (ok) res.status(204).send();
        else res.status(404).json({msg:"No comment found"});
    } catch ({name, message}) {
        if (message == "TypeError") res.status(400).json({msg:"Incorrect input data"});
        else res.status(500).json({msg:"Internal server error"});
    }
}

export const updateRestaurant = async (req, res) => {
    const { id, name, category, phone, website, address } = req.body;

    // Add check for user privileges here, same as above and below

    try {
        const restaurant = await dao.update(id, name, category, phone, website, address);
        if (restaurant) res.status(200).json(restaurant);
        else res.status(404).json({msg:"No restaurant found"});
    } catch ({name, message}) {
        if (message == "TypeError") res.status(400).json({msg:"Incorrect input data"});
        else res.status(500).json({msg:"Internal server error"});
    }
}

export const updateReview = async (req, res) => {
    const { restaurantId, commentId, rating, comment } = req.body;

    try {
        const user = {_id:"673c7e0099784abcd6d256ee"}; // For testing purposes, will be replaced by jwt check when the final db form is decided
        const ok = await dao.editReview(restaurantId, commentId, rating, comment);
        if (ok) res.status(204).send();
        else res.status(404).json({msg:"No review found"});
    } catch ({name, message}) {
        if (message == "TypeError") res.status(400).json({msg:"Incorrect input data"});
        else res.status(500).json({msg:"Internal server error"});
    }
}