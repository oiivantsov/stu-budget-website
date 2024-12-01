import DAO from "../../services/dao/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";
import { verifyUserId, verifyRestaurantId } from "../../utils/verifiers.js";
import Tracer from "../../utils/tracer.js";
import Image from "../../db/models/image.model.js";

const { RestaurantDAO, ReviewDAO } = DAO;
const reviewDao = new ReviewDAO();
const dao = new RestaurantDAO();

const INFO = "RESTAURANT_INFO";
const ERROR = "RESTAURANT_ERROR";

Tracer.register(INFO);
Tracer.register(ERROR);

export const getAll = async (_, res) => {
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
        const { id } = req.query;
        Tracer.print(INFO, `Attempting to find restaurant by id ${id}..`);
        const restaurant = await dao.findOneById(id);
        return res.json(restaurant);
    } catch (e) {
        Tracer.error(ERROR, e);
        if (e.name === "CastError") return res.status(400).json({msg:"Bad id"});
        else return res.status(500).json({msg:"Server error"});
    }
}

export const getByCity = async (req, res) => {
    try {
        const { city } = req.query;
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
        const userCoords = await getCoordinates(street, city);
        // Also: make sure that street exists and gives valid information
        // Coords for Annankatu 28, Helsinki
        // const userCoords = { lat: 60.167631344585125, long: 24.93563026163244 };

        // Get restaurants by city
        const restaurants = await dao.findByCity(city);

        // Alternatively we could just return an empty object below
        if (restaurants.length < 1) return res.status(404).json({msg:`No restaurants in ${city} found`});

        // Calculate distances
        // For-loop used on purpose instead of forEach.
        // Awaiting not possible inside of forEach.
        Tracer.print(INFO, `Attempting to find nearby restaurants in ${city} with range of ${limit}..`);
        for (let i = 0; i < restaurants.length; i++) {
            const responseObj = { restaurant: restaurants[i] };
            const restaurantCoords = {lat: restaurants[i].latitude, long: restaurants[i].longitude};
            responseObj.distance = getDistanceBetweenCoords(userCoords, restaurantCoords);

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
        const review = req.body;
        const user = req.user;
        Tracer.print(INFO, `Attempting to add review for restaurant with id ${review.restaurant}..`);
        // Verify that user and restaurant ids are valid and correspond to real documents
        switch (await verifyRestaurantId(review.restaurant)) {
            case "not found":
                return res.status(400).json({error: `No restaurant with id ${review.restaurant} found`});
            case "invalid":
                return res.status(400).json({error: "Invalid restaurant id"});
        }

        const usersReviewsForRestaurants = await reviewDao.findByUserAndRestaurant(user, review.restaurant);
        console.log(usersReviewsForRestaurants);

        if (usersReviewsForRestaurants.length > 0) {
            return res.status(400).json({error: "Cannot add more than 1 review for each restaurant"});
        }

        // Attach the submitting user to the review
        review.user = user._id;

        // Add review
        await dao.addReview(review);
        await reviewDao.persist(review);

        Tracer.print(INFO, `Review added to restaurant ${review.restaurant} succesfully`)
        return res.status(200).json({message: "Review added succesfully" });

    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({error:"Server error"});
    }
}

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.query;
        const user = req.user;

        Tracer.print(INFO, `Attempting to delete review with id ${id}..`);
        const review = await reviewDao.findOneById(id);
        if (review === null) {
            Tracer.error(ERROR, {name:"NotFound", message:"No review found"});
            return res.status(404).json({msg:"No review found"});
        }

        // Checks if the authenticated user is trying to delete another user's review
        if (review.user.toString() !== user._id.toString()) {
            Tracer.error(ERROR, {name:"Unauthorized", message:"Cannot delete other user's review"});
            return res.status(401).json({error: "Cannot delete other user's review"});
        }

        await dao.deleteReview(review);
        await reviewDao.deleteById(id);
        Tracer.print(INFO, `Succesfully delted review with id ${id}`);
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
        const user = req.user;

        Tracer.print(INFO, `Attempting to update review with id ${id}..`);

        const review = await reviewDao.findOneById(id);

        if (review === null) {
            Tracer.error(ERROR, {name:"NotFound", message:"No review found"});
            return res.status(404).json({msg:`No review with id ${id} found`});
        }

        // Checks if the authenticated user is trying to update another user's review
        if (review.user.toString() !== user._id.toString()) {
            Tracer.error(ERROR, {name:"Unauthorized", message:"Cannot update other user's review"});
            return res.status(401).json({error: "Cannot update other user's review"});
        }

        await dao.deleteReview(review);
        await dao.addReview({restaurant:review.restaurant, rating:rating, comment:comment});

        const ok = await reviewDao.updateReview(id, rating, comment);

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
        const { user, restaurant } = req.query;
        const createdImage = await Image.create({user, restaurant, image:req.file.filename});
        const ok = await dao.addImage(restaurant, createdImage.image);
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
        const img = await Image.findOne({_id:id});
        const deletedImage = await Image.deleteOne({_id:id});

        if (deletedImage.deletedCount > 0) {
            await dao.removeImage(img.restaurant, img.image);
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
