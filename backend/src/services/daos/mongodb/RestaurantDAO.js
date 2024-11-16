import { MongooseConnection } from "../../../db/mongodb.js";
import Restaurant from "../../../db/models/restaurant.model.js";

export default class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
    }

    async findOneById(id) {
        const restaurant = await Restaurant.findOne({_id:id});
        return restaurant;
    }

    async findByCity(city) {
        const restaurants = await Restaurant.find({"address.city": city});
        return restaurants;
    }

    async findAll() {
        const restaurants = await Restaurant.find();
        return restaurants;
    }
    async persist() {}

    async update(restaurant) {
        const result = await Restaurant.updateOne(restaurant);
        return result;
    };
    async delete(item) {};
}