"use strict";

import mongoose from "mongoose";
import reviewSchema from "./review.schema.js";


const restaurantSchema = new mongoose.Schema({
    id: Number,
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
        ratings: [reviewSchema]
    }
});


export default restaurantSchema;
