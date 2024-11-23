import MongooseConnection from "../../../db/mongodb.js";
import Restaurant from "../../../db/models/restaurant.model.js";
import ReviewDAO from "./subdaos/ReviewDAO.js";


export default class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
        this.reviewDao = new ReviewDAO();
    }

    async findOneById(restaurantId) {
        return await Restaurant.find({_id: restaurantId});
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

    async persist(item) {};
    async update(item) {};
    async delete(item) {};

    // TODO: Update reviewsTotal and reviewsAverage in affected restaurant
    async addReview(review) {
        return await this.reviewDao.persist(review);
    }

    async findReviewByUserAndRestaurant(userId, restaurantId) {
        return await this.reviewDao.findByUserAndRestaurant(userId, restaurantId);
    }
}
