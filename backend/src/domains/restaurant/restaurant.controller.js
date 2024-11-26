import DAO from "../../services/dao/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
//import { getCoordinates } from "../../services/apis/openrouteservice.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";

const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = async (req, res) => {
    res.json(await dao.findAll());
}

export const getByCity = async (req, res) => {
    const clientCity = req.params.city.replace(" ", "").toLowerCase();

    const restaurants = await dao.findByCity(clientCity);
    // console.log("Controller", restaurants);

    if (restaurants === undefined) {
        res.status(404).json({ msg: `Restaurants not found in ${clientCity}` });
        return;
    }

    if (restaurants === null) {
        res.status(500).json({ msg: "Internat server error" });
        return;
    }

    res.status(200).json(restaurants);
}

export const getNearby = async (req, res) => {
    let nearby = [];

    // User info
    const userStreet = req.params.street.replace(" ", "").toLowerCase();
    const userCity = req.params.city.replace(" ", "").toLowerCase();
    const nearbyLimit = Number(req.params.limit);

    if (
        userStreet === undefined
        || userCity === undefined
        || nearbyLimit === undefined
    ) {
        res.status(400).json({ msg: "One of these parameters is missing from request: street, city, limit." });
    }
    // Disabled to save on api requests, tested and working
    //const userCoords = await getCoordinates(userStreet, userCity);
    const userCoords = { lat: 60.17061377899731, long: 24.941133275874176 };

    // Get restaurants by city
    let restaurants = await dao.findByCity(userCity);

    // Calculate distances
    // For-loop used on purpose instead of forEach.
    // Awaiting not possible inside of forEach.
    for (let i = 0; i < restaurants.length; i++) {
        const responseObj = { restaurant: restaurants[i] };
        responseObj.distance = getDistanceBetweenCoords(userCoords, restaurants[i].coordinates);

        if (responseObj.distance <= nearbyLimit) {
            nearby.push(responseObj);
        }
    }

    nearby = nearby.sort((next, prev) => {
        if (next.distance < prev.distance) {
            return -1;
        } else if (next.distance > prev.distance) {
            return 1;
        } else {
            return 0;
        }
    });
    console.log(nearby);

    res.json(nearby);
};

export const addReview = async (req, res) => {
    // Check for missing fields
    const requiredFields = [
        "user",
        "restaurant",
        "rating"
    ];

    let missingFields = "Request missing fields:";
    const initLength = missingFields.length;

    requiredFields.forEach(field => {
        if (!req.body[field]) {
            missingFields += " " + field + ",";
        }
    });

    if (missingFields.length > initLength) {
        return res.status(400).json({message: missingFields});
    }

    try {
        const review = req.body;

        // Verify that user and restaurant ids are valid and correspond to real documents
        switch (await verifyRestaurantId(review.restaurant)) {
            case "not found":
                return res.status(400).json({ message: `No restaurant found with id ${review.restaurant}` });
            case "invalid":
                return res.status(400).json({ message: "Invalid restaurant id" });
        }

        switch (await verifyUserId(review.user)) {
            case "not found":
                return res.status(400).json({ message: `No user found with id ${review.user}` });
            case "invalid":
                return res.status(400).json({ message: "Invalid user id" });
        }

        // Add review
        await dao.addReview(review);
        res.status(200).json({ message: "Review added succesfully" });

    } catch (error) {
        console.error("Error in /restaurant/review/add", error);
        res.status(500).json({ error: "Server error" });
    }
}
