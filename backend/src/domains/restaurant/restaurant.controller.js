import DAO from "../../services/dao/index.js";
import { getDistanceBetweenCoords } from "../../utils/distanceBetweenCoords.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";
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

export const uploadImage = async (req, res) => {
    try {
        const { user, restaurant } = req.query;
        const createdImage = await Image.create({user, restaurant, image:req.file.filename});
        const ok = await dao.addImage(restaurant, createdImage.image);
        if (createdImage && ok.modifiedCount > 0) {
            return res.status(201).json({msg:"Image creation has succeeded", img: createdImage.image});
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
