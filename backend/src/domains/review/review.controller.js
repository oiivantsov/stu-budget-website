import Review from "../../db/models/review.model.js";
import Restaurant from "../../db/models/restaurant.model.js";
import Tracer from "../../utils/tracer.js";
import mongoose from "mongoose";
import { verifyRestaurantId, verifyUserId } from "../../utils/verifiers.js";
import objectOnlyHasFields from "../../utils/objectOnlyHasFields.js";

const INFO = "REVIEW_INFO";
const ERROR = "REVIEW_ERROR";


Tracer.register(INFO);
Tracer.register(ERROR);

export const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.query;

        const review = await Review.findById(reviewId);

        if (review === null) {
            return res.status(404).json({ error: `No review found for id ${reviewId}` });
        }

        return res.status(400).json(review);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ error: "Invalid review id" });
        }

        Tracer.print(ERROR, error);

        return res.status(400).json({ error: error.message });
    }
};

export const getAllReviewsForRestaurant = async (req, res) => {
    try {
        let { restaurantId } = req.query;

        switch (await verifyRestaurantId(restaurantId)) {
            case "not found":
                return res.status(404).json({ error: `No restaurant found with id ${restaurantId}` });
            case "invalid":
                return res.status(400).json({ error: `Invalid restaurant id ${restaurantId}` });
        }

        const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'username'); // Return also the name of the user
        return res.status(200).json(reviews);
    } catch (error) {
        Tracer.print(ERROR, error);
        res.status(400).json({ error: error.message });
    }
};

export const getAllReviewsForUser = async (req, res) => {
    try {
        let { userId } = req.query;

        switch (await verifyUserId(userId)) {
            case "not found":
                return res.status(404).json({ error: `No user found with id ${userId}` });
            case "invalid":
                return res.status(400).json({ error: `Invalid user id ${userId}` });
        }

        const reviews = await Review.find({ user: userId }).populate('restaurant', 'name'); // Return also the name of the restaurant
        return res.status(200).json(reviews);
    } catch (error) {
        Tracer.print(ERROR, error);
        res.status(400).json({ error: error.message });
    }
}

export const addReview = async (req, res) => {
    try {
        const review = req.body;
        const user = req.user;
        Tracer.print(INFO, `Attempting to add review for restaurant with id ${review.restaurant}..`);
        // Verify that user and restaurant ids are valid and correspond to real documents
        switch (await verifyRestaurantId(review.restaurant)) {
            case "not found":
                return res.status(400).json({ error: `No restaurant with id ${review.restaurant} found` });
            case "invalid":
                return res.status(400).json({ error: "Invalid restaurant id" });
        }

        const usersReviewsForRestaurants = await Review.find({ user, restaurant: review.restaurant});

        if (usersReviewsForRestaurants.length > 0) {
            return res.status(400).json({ error: "Cannot add more than 1 review for each restaurant" });
        }

        // Attach the submitting user to the review
        review.user = user._id;

        // Add review
        await Restaurant.addReview(review);
        await Review.create(review);

        Tracer.print(INFO, `Review added to restaurant ${review.restaurant} succesfully`)
        return res.status(200).json({ message: "Review added succesfully" });

    } catch (e) {
        Tracer.error(ERROR, e);
        return res.status(500).json({ error: "Server error" });
    }
};

export const patchReview = async (req, res) => {
    const user = req.user;
    const { reviewId } = req.query;
    const patchedReview = req.body;

    const extraFields = objectOnlyHasFields(patchedReview, ["comment", "rating"]);

    if (extraFields) {
        return res.status(400).json({ msg: "Non-allowed or unnecessary fields in request", fields: extraFields });
    }

    try {
        const prev = await Review.findOne({_id:reviewId});
        const result = await Review.findOneAndUpdate({ _id: reviewId, user: user._id }, { ...patchedReview }, { new: true });
        await Restaurant.deleteReview(prev);
        await Restaurant.addReview(result);

        res.status(200).json(result);
    } catch (error) {
        Tracer.print(ERROR, error);
        res.status(400).json({ error: error.message });
    }
};

// also need to recalculate the average rating and number of reviews for the restaurant
export const deleteReview = async (req, res) => {
    try {
        const user = req.user;
        const { reviewId } = req.query;

        const result = await Review.findOneAndDelete({ _id: reviewId, user: user._id });
        await Restaurant.deleteReview(result);

        if (result === null) {
            return res.status(404).json({ error: `No review for user found with id ${reviewId}` });
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            return res.status(400).json({ error: "Invalid review id" });
        }
        Tracer.print(ERROR, error);
        return res.status(400).json({ error: error.message });
    }
};

export default {
    getReviewById,
    getAllReviewsForRestaurant,
    getAllReviewsForUser,
    addReview,
    patchReview,
    deleteReview
};
