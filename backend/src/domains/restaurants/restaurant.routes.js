import { Router } from "express";
const router = Router();
import { getAll, getById, getByCity, getNearby, getReviews, addReview, deleteReview, updateReview, updateRestaurant } from "./restaurant.controller.js"

// Restaurants
router.get("/all", getAll);
router.get("/", getById);
router.get("/city/:city", getByCity);
router.put("/edit", updateRestaurant);
// router.delete("/delete") Will implement if needed

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

// Reviews
router.get("/reviews/:restaurantId", getReviews);
router.post("/reviews/add", addReview);
router.delete("/reviews/delete", deleteReview);
router.put("/reviews/update", updateReview);

export default router;
