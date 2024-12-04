import Review from "../../db/models/review.model.js";
import Restaurant from "../../db/models/restaurant.model.js";
import Tracer from "../../utils/tracer.js";
import { verifyRestaurantId} from "../../utils/verifiers.js";

const INFO = "REVIEW_INFO";
const ERROR = "REVIEW_ERROR";


Tracer.register(INFO);
Tracer.register(ERROR);

export const getAllReviewsForRestaurant = async (req, res) => {
    try {
        let { restaurantId } = req.query;

        switch (await verifyRestaurantId(restaurantId)) {
            case "not found":
                return res.status(404).json({error: `No restaurant found with id ${restaurantId}`});
            case "invalid":
                return res.status(400).json({error: `Invalid restaurant id ${restaurantId}`});
        }

        const reviews = await Review.find({restaurant: restaurantId});
        return res.status(200).json(reviews);
    } catch (error) {
        Tracer.print(ERROR, error);
        res.status(400).json({error: error.message});
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

        const usersReviewsForRestaurants = await Review.find({user});

        if (usersReviewsForRestaurants.length > 0) {
            return res.status(400).json({error: "Cannot add more than 1 review for each restaurant"});
        }

        // Attach the submitting user to the review
        review.user = user._id;

        // Add review
        await Restaurant.addReview(review);
        await Review.create(review);

        Tracer.print(INFO, `Review added to restaurant ${review.restaurant} succesfully`)
        return res.status(200).json({message: "Review added succesfully" });

    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({error:"Server error"});
    }
}

export default {
    getAllReviewsForRestaurant,
    addReview,
};