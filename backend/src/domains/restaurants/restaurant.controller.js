import DAO from "../../services/daos/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";
import Tracer from "../../utils/tracer.js";
import Image from "../../db/models/image.model.js";

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
        return res.json(await dao.findAll());
    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({msg:"Server error"});
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.body;
        Tracer.print(INFO, `Attempting to find restaurant by id ${id}..`);
        return res.json(await dao.findOneById(id));
    } catch (e) {
        Tracer.error(ERROR, e);
        if (e.name === "CastError") return res.status(400).json({msg:"Bad id"});
        else return res.status(500).json({msg:"Server error"});
    }
}

export const getByCity = async (req, res) => {
    try {
        const { city } = req.body;
        Tracer.print(INFO, `Attempting to find restaurants in ${city}..`);
        const restaurants = await dao.findByCity(city);
        if (restaurants.length > 0) return res.json(restaurants);
        else return res.status(404).json({msg:`No restaurants in ${city} found`})
    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({msg:"Server error"});
    }
}

export const getNearby = async (req, res) => {
    try {
        const city = req.body.city;
        const street = req.body.street;
        const limit = Number(req.body.limit);
        if (isNaN(limit)) {
            Tracer.error(ERROR, {name:"TypeError", message:"Distance has to be a number"});
            return res.status(400).json({msg:"Distance has to be a number"});
        }
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
        return res.json(nearby);
    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({msg:"Server error"});
    }
};

export const addReview = async (req, res) => {
    try {
        const { restaurant, user } = req.body;
        Tracer.print(INFO, `Attempting to add review for restaurant with id ${restaurant}..`);
        // Verify that user and restaurant ids are valid and correspond to real documents
        await verifyRestaurantId(restaurant, res);
        await verifyUserId(user, res);

        // Add review
        await dao.addReview(req.body);
        await reviewdao.persist(req.body);
        return res.status(200).json({message: "Review added succesfully" });

    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({error:"Server error"});
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.body;
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
        if (e.name === "CastError") {
            return res.status(400).json({msg:"Bad review id"});
        } else {
            return res.status(500).json({msg:"Server error"});
        }
    }
}

export const updateReview = async (req, res) => {
    try {
        const { id, rating, comment } = req.body;
        Tracer.print(INFO, `Attempting to update review with id ${id}..`);
        // Check if requester is owner here

        const review = await reviewdao.findOneById(id);
        await dao.deleteReview(review);
        await dao.addReview({restaurant:review.restaurant, rating:rating, comment:comment});

        const ok = await reviewdao.updateReview(id, rating, comment);

        if (ok.modifiedCount > 0) return res.status(200).send();
        else return res.status(500).json({msg:"Entry was not modified"});
    } catch (e) {
        Tracer.error(ERROR, e);
        if (e.name === "CastError") {
            res.status(400).json({msg:"Bad review id"});
        } else {
            res.status(500).json({msg:"Server error"});
        }
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { id, restaurant } = req.params;
        const createdImage = await Image.create({user:id, image:req.file.filename});
        const ok = await dao.addImage(restaurant, ok.image);
        if (createdImage && ok.modifiedCount > 0) {
            return res.status(201).json({msg:"Image creation has succeeded"});
        } else {
            console.log("Image creation failed");
            return res.status(500).json({msg:"Image creation has failed"});
        }
    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({msg:"Server error"});
    }
}

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedImage = await Image.deleteOne({_id:id});

        if (deletedImage.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json({msg:"No image found"});
        }

    } catch (e) {
        Tracer.error(ERROR, e);
        if (e.name === "CastError") {
            return res.status(400).json({msg:"Bad image id"});
        } else {
            return res.status(500).json({msg:"Server error"});
        }
    }
}