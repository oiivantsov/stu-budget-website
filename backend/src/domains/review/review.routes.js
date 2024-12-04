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
    GET All reviews for a user
    
    Query: userId
*/
router.get(
    "/user",
    checkParameters([], [], ["userId"]),
    controller.getAllReviewsForUser
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
);

/*
    DELETE Review
    
    Protected

    Query: reviewId
*/
router.delete(
    "/",
    checkParameters([], [], ["reviewId"]),
    auth,
    controller.deleteReview
);

export default router;
