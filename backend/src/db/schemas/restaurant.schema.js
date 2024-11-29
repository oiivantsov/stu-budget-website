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


export default restaurantSchema;
