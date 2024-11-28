"use strict";

import Review from "../../db/models/review.model.js";


export default class ReviewDAO {
    constructor() {
    }

    async findOneById(reviewId) {
        return await Review.findOne({ _id: reviewId });
    }

    async findAllByRestaurant(restaurantId) {
        return await Review.find({restaurant: restaurantId});
    }

    async findAllByUser(userId) {
        return await Review.find({user: userId});
    }

    async findByUserAndRestaurant(userId, restaurantId) {
        return await Review.find({user: userId, restaurant: restaurantId});
    }

    // User and restaurant ids for review are presumed to never change
    async updateReview(reviewId, rating, comment) {
        const updatedFields = {};

        if (rating) {
            updatedFields.rating = rating;
        }

        if (comment) {
            updatedFields.comment = comment;
        }

        return await Review.updateOne({_id: reviewId}, updatedFields);
    }

    async persist(review) {
        return await Review.create(review);
    }

    async deleteById(reviewId) {
        return await Review.deleteOne({_id: reviewId});
    }
}
