"use strict";

import mongoose from "mongoose";


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
    images: [mongoose.Schema.Types.ObjectId],
    reviewsTotal: Number,
    reviewsAverage: Number,
});


export default restaurantSchema;
