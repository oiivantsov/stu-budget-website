import { Router } from "express";
const router = Router();
import { getAll, getByCity, getNearby, addReview } from "./restaurant.controller.js"

// GET all
router.get("/all", getAll);

// GET restaurant by name
// router.get("/:name", getByName);

// GET restaurants by city
router.get("/city/:city", getByCity);

// GET nearby restaurants
/*
* Example request GET nearby/Mannerheimintie 1/Helsinki/10000
*
* Limit defines the distance from which restaurants are shown.
* In the above example restaurants further than 10,000 metres / 10km
* will not be provided in the response.
*
* Only restaurants in the given city are provided in the response.
*
* Limit and provided distances are in metres.
*/
router.get("/nearby/:street/:city/:limit", getNearby);

// POST Add review
router.post("/review/add", addReview);

export default router;
