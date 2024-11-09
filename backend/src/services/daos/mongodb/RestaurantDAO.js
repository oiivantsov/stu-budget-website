import mongoose from "mongoose";
import { MongooseConnection } from "../../../db/mongodb.js";

// For now here, will move to better place later

const reviewSchema = new mongoose.Schema({
    id:Number,
    name:String,
    rating:String,
    comment:String
})

const restaurantSchema = new mongoose.Schema({
    id:Number,
    name:String,
    category:String,
    phone:String,
    website:String,
    address: {
        street:String,
        postal:String,
        city:String,
        country:String
    },
    images:[String],
    reviews:{
        total:Number,
        average:Number,
        ratings: [reviewSchema]
    }
})

const Mymodel = mongoose.model("restaurants", restaurantSchema);

export class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
    }

    async findOne(name) {
        return "Not implemented yet";
    };
    async findAll() {
        try {
        const restaurants = await Mymodel.find();
        console.log(restaurants);
        return restaurants;
        } catch (e) {
            console.log(e.message);
        }
    }
    async persist(item) {};
    async update(item) {};
    async delete(item) {};

}