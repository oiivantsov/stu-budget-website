import DAO from "../../services/daos/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";

const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = async (req, res) => {
    try {
        const result = dao.findAll();
        res.json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({msg:"Internal server error"});
    }
}

export const getByCity = async (req, res) => {
    try {
        const restaurants = await dao.findByCity(req.params.city.replace(" ", ""));
        if (restaurants.length > 0) res.json(restaurants);
        else res.status(404).send();
    } catch (e) {
        console.log(e.message);
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
    } catch (e) {
        console.log(e.message);
        res.status(500).send({msg:"Internal server error"});
    }
};

export const getReviews = async (req, res) => {
    try {
        const restaurant = await dao.findOneById(req.params.id);
        const comments = restaurant.reviews.comments;
        console.log(restaurant);
        res.json(restaurant);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({msg:"Internal server error"});
    }
}

export const addReview = async (req, res) => {
    if (!req.body.comment || !req.body.rating || !req.body.restaurantId) res.status(400).json({msg:"One of review parameters is missing"});
    try {
        // const user = userdao.findUserBySomeMethod(req.header.jwtToken);
        const user = {_id:"29342934"}; // For testing purposes
        const { rating, comment, restaurantId } = req.body;
        const restaurant = await dao.findOneById(restaurantId);
        restaurant.reviews.comments.push({reviewer:user._id, rating:rating, comment:comment});
        restaurant.reviews.total += 1;
        restaurant.reviews.average = average + ((value - average) / (restaurant.reviews.total + 1)) // average = (average * nValues - value) / (nValues - 1) -> for subtracting
        dao.update(restaurant);
        res.status(201).json(restaurant);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({msg:"Internal server error"});
    }
}