import {Router} from "express";
import controller from "./review.controller.js";
import {checkParameters} from "../../utils/checkParameters.js";
import auth from "../../middlewares/auth.js";


const router = Router();

/*
    GET Review by id

    Query: reviewId
*/
router.get(
    "/",
    checkParameters([], [], ["reviewId"]),
    controller.getReviewById
);

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
    PATCH Update, but don't replace, review

    Protected

    Body: {
        [optional] rating
        [optional] comment
    }
    Query: reviewId
*/
router.patch(
    "/",
    checkParameters([], [], ["reviewId"]),
    auth,
    controller.patchReview
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
