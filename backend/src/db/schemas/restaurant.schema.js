"use strict";

import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    // Set constants from DB
    name: { type: String, required: true },
    address: { type: String, required: true },
    postal_code: { type: String, required: true },
    city: { type: String, required: true },
    website: String,
    longitude: Number,
    latitude: Number,

    // Modifiable by this server
    images: {
        type: [String],
        autoCreate: true,
    },
    reviewsTotal: {
        type: Number,
        autoCreate: true,
        default: 0
    },
    reviewsAverage: {
        type: Number,
        autoCreate: true,
        default: 0
    },
});

restaurantSchema.statics.addReview = async function (review) {
    const restaurant = await this.findOne({_id:review.restaurant});
    if (!restaurant.reviewsTotal) restaurant.reviewsTotal = 0;
    if (!restaurant.reviewsAverage) restaurant.reviewsAverage = 0;
    restaurant.reviewsAverage = restaurant.reviewsAverage + ((review.rating - restaurant.reviewsAverage) / (restaurant.reviewsTotal + 1));
    restaurant.reviewsTotal += 1;
    await this.updateOne({_id: review.restaurant}, restaurant);
}

restaurantSchema.statics.deleteReview = async function (review) {
    const restaurant = await this.findOne({_id:review.restaurant});
    restaurant.reviewsAverage = (restaurant.reviewsAverage * restaurant.reviewsTotal - review.rating) / (restaurant.reviewsTotal - 1);
    restaurant.reviewsTotal -= 1;
    await this.updateOne({_id: restaurant._id}, restaurant);
}


export default restaurantSchema;
