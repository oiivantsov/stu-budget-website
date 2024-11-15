import { MongooseConnection } from "../../../db/mongodb.js";
import Restaurant from "../../../db/models/restaurant.model.js";


export default class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
    }

    async findOne(name) {
        return "Not implemented yet";
    };

    async findByCity(city) {
        const restaurants = await Restaurant.find({"address.city": city});
        // console.log("DAO", restaurants);
        return restaurants;
    }

    async findAll() {
        try {
            const restaurants = await Restaurant.find();
            // console.log(restaurants);
            return restaurants;
        } catch (e) {
            console.log(e.message);
        }
    }
    async persist(item) { };
    async update(item) { };
    async delete(item) { };
}
