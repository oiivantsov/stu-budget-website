"use strict";

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer:mongoose.Schema.Types.ObjectId,
    rating: String,
    comment: String
})

const restaurantSchema = new mongoose.Schema({
    name: String,
    category: String,
    phone: String,
    website: String,
    address: {
        street: String,
        postal: String,
        city: String,
        country: String
    },
    coordinates: {
        lat: Number,
        long: Number
    },
    images: [String],
    reviews: {
        total: Number,
        average: Number,
        comments: [reviewSchema]
    }
});

export default mongoose.model("Restaurant", restaurantSchema);
