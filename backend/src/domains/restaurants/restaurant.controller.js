import DAO from "../../services/daos/index.js";
import { getDistanceToRestaurant } from "../../utils/distanceToRestaurant.js";
import { getCoordinates } from "../../services/apis/openrouteservice.js";

const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = async (req, res) => {
    res.json(await dao.findAll());
}

export const getByName = async (req, res) => {
    const restaurant = await dao.findOneByName(req.params.name);

    if (restaurant === undefined) {
        res.status(404).json({ msg: `${req.params.name} not found` });
        return;
    } else if (restaurant === null) {
        res.status(500).json({ msg: "Internal server error" });
        return;
    }

    res.json(restaurant);
}

export const getNearby = async (req, res) => {
    let nearby = [];

    // User info
    const userStreet = req.params.street;
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

    // Get restaurants and filter by city
    let restaurants = await dao.findAll();

    restaurants = restaurants.filter(restaurant => {
        const restaurantCity = restaurant.address.city.replace(" ", "").toLowerCase();

        return restaurantCity === userCity;
    });

    // Calculate distances
    // For-loop used on purpose instead of forEach.
    // Awaiting not possible inside of forEach.
    for (let i = 0; i < restaurants.length; i++) {
        restaurants[i].distance = await getDistanceToRestaurant(userCoords, restaurants[i].id);

        if (restaurants[i].distance <= nearbyLimit) {
            nearby.push(restaurants[i]);
        }
    }

    nearby = nearby.sort((next, prev) => {
        if (next.distance < prev.distance) {
            return -1;
        } else if (next.distance > prev.distance) {
            return 1;
        } else {
            return 0;
        };
    });

    res.json(nearby);
};
