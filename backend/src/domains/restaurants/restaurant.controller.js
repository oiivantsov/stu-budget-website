import DAO from "../../services/daos/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";
import Tracer from "../../utils/tracer.js";

const { RestaurantDAO, ReviewDAO } = DAO;
const reviewdao = new ReviewDAO();
const dao = new RestaurantDAO();

const INFO = "RESTAURANT_INFO";
const ERROR = "RESTAURANT_ERROR";

Tracer.register(INFO);
Tracer.register(ERROR);

export const getAll = async (req, res) => {
    try {
        Tracer.print(INFO, "Attempting to find all restaurants..");
        res.json(await dao.findAll());
    } catch (e) {
        Tracer.error(ERROR, e);
        res.status(500).json({msg:"Server error"});
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.body;
        Tracer.print(INFO, `Attempting to find restaurant by id ${id}..`);
        res.json(await dao.findOneById(id));
    } catch (e) {
        Tracer.error(ERROR, e);
        if (e.name === "CastError") res.status(400).json({msg:"Bad id"});
        else res.status(500).json({msg:"Server error"});
    }
}

export const getByCity = async (req, res) => {
    const { city } = req.body;
    if (!city) return res.status(400).json({msg:"City parameter is missing"});

    try {
        Tracer.print(INFO, `Attempting to find restaurants in ${city}..`);
        const restaurants = await dao.findByCity(city);
        if (restaurants.length > 0) res.json(restaurants);
        else res.status(404).json({msg:`No restaurants in ${city} found`})
    } catch (e) {
        Tracer.error(ERROR, e);
        res.status(500).json({msg:"Server error"});
    }
}

export const getNearby = async (req, res) => {

    const city = req.body.city;
    const street = req.body.street;
    const limit = Number(req.body.limit);

    if (isNaN(limit)) {
        Tracer.error(ERROR, {name:"TypeError", message:"Distance has to be a number"});
        return res.status(400).json({msg:"Distance has to be a number"});
    }
    if (!city || !street || !limit) {
        Tracer.error(ERROR, {name:"ParameterError", message:"Missing parameters"});
        return res.status(400).json({msg:"One of the parameters is missing"});
    }


    try {
        let nearby = [];
        // Disabled to save on api requests, tested and working
        //const userCoords = await getCoordinates(userStreet, userCity);
        // Also: make sure that street exists and gives valid information
        const userCoords = { lat: 60.17061377899731, long: 24.941133275874176 };

        // Get restaurants by city
        let restaurants = await dao.findByCity(city);

        // Alternatively we could just return an empty object below
        if (restaurants.length < 1) return res.status(404).json({msg:`No restaurants in ${city} found`});

        // Calculate distances
        // For-loop used on purpose instead of forEach.
        // Awaiting not possible inside of forEach.
        Tracer.print(INFO, `Attempting to find nearby restaurants in ${city} with range of ${limit}..`);
        for (let i = 0; i < restaurants.length; i++) {
            const responseObj = { restaurant: restaurants[i] };
            responseObj.distance = getDistanceBetweenCoords(userCoords, restaurants[i].coordinates);

            if (responseObj.distance <= limit) nearby.push(responseObj);
        }

        nearby = nearby.sort((next, prev) => next.distance - prev.distance);
        res.json(nearby);
    } catch (e) {
        Tracer.error(ERROR, e);
        res.status(500).json({msg:"Server error"});
    }
};

export const addReview = async (req, res) => {
    // Check for missing fields
    let requiredFields = [
        "user",
        "restaurant",
        "rating",
        "comment"
    ];

    requiredFields = requiredFields.filter(entry => !req.body[entry])

    if (requiredFields.length > 0) {
        Tracer.error(ERROR, {name:"ParameterError", message:"Missing parameters"});
        return res.status(400).json({message:`Missing parameters: ${requiredFields.map(field => field)}`});
    }

    try {
        const { restaurant, user } = req.body;

        Tracer.print(INFO, `Attempting to add review for restaurant with id ${restaurant}..`);

        // Verify that user and restaurant ids are valid and correspond to real documents
        switch (await verifyRestaurantId(restaurant)) {
            case "not found":
                return res.status(404).json({ message: `No restaurant found with id ${restaurant}` });
            case "invalid":
                return res.status(400).json({ message: "Invalid restaurant id" });
        }

        switch (await verifyUserId(user)) {
            case "not found":
                return res.status(404).json({ message: `No user found with id ${user}` });
            case "invalid":
                return res.status(400).json({ message: "Invalid user id" });
        }

        // Add review
        await dao.addReview(req.body);
        await reviewdao.persist(req.body);
        res.status(200).json({message: "Review added succesfully" });

    } catch (e) {
        Tracer.error(ERROR, e);
        res.status(500).json({error:"Server error"});
    }
}

export const deleteReview = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        Tracer.error(ERROR, {name:"ParameterError", message:"Missing parameters"});
        return res.status(400).json({msg:"Missing id parameter"});
    }

    try {
        Tracer.print(INFO, `Attempting to delete review with id ${id}..`);
        // Check if requester is owner here
        const review = await reviewdao.findOneById(id);
        if (review.length < 1) {
            Tracer.error(ERROR, {name:"NotFound", message:"No review found"});
            return res.status(404).json({msg:"No review found"});
        }
        await dao.deleteReview(review);
        await reviewdao.deleteById(id);
        return res.status(204).send();

    } catch (e) {
        Tracer.error(ERROR, e)
        res.status(500).json({msg:"Server error"});
    }
}

export const updateReview = async (req, res) => {

    try {
        const { id, rating, comment } = req.body;
        Tracer.print(INFO, `Attempting to update review with id ${id}..`);
        // Check if requester is owner here

        const ok = await reviewdao.updateReview(id, rating, comment);

        if (ok.modifiedCount > 0) return res.status(200).send();
        else return res.status(500).json({msg:"Could not update review"});
    } catch (e) {
        Tracer.error(ERROR, e);
        res.status(500).json({msg:"Server error"});
    }
}

export const addImage = async (req, res) => {
    // Todo
}

export const removeImage = async (req, res) => {
    // Todo
}