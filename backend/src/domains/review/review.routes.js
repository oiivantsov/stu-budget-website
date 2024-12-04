import {Router} from "express";
import controller from "./review.controller.js";
import {checkParameters} from "../../utils/checkParameters.js";
import auth from "../../middlewares/auth.js";


const router = Router();

/*
    GET All reviews for a restaurant

    Query: restaurantId
 */
router.get(
    "/restaurant",
    checkParameters([], [], ["restaurantId"]),
    controller.getAllReviewsForRestaurant
);

/*
    POST Add review

    Protected

    Body: {
        restaurant: ObjectId/String
        rating: Number

        [optional] comment: String
    }
 */
router.post(
    "/",
    checkParameters([], ["restaurant", "rating"], []),
    auth,
    controller.addReview
)

export default router;