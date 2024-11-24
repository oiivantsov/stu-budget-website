import MongooseConnection from "../../../db/mongodb.js";
import Restaurant from "../../../db/models/restaurant.model.js";
import ReviewDAO from "./ReviewDAO.js";


export default class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
        this.reviewDao = new ReviewDAO();
    }

    async findOneById(restaurantId) {
        return await Restaurant.findOne({_id: restaurantId});
    };

    async findByCity(city) {
        return await Restaurant.find({"address.city":city});
    }

    async findAll() {
        return await Restaurant.find();
    }

    async persist(restaurant) {
        return await Restaurant.create(restaurant);
    }

    async update(id, data) {
        // Do we need this?
    }

    async delete(id) {
        return await Restaurant.deleteOne({_id:id});
    }

    async addImage(id, image) {
        const restaurant = await Restaurant.findOne({_id:id});
        return await Restaurant.updateOne({_id:id}, {
            images:[...restaurant.images, image]
        })
    }

    async removeImage(id, image) {
        const restaurant = await Restaurant.findOne({_id:id});
        return await Restaurant.updateOne({_id:id}, {
            images:restaurant.images.filter(img => img !== image)
        })
    }

    async addReview(review) {
        const restaurant = await Restaurant.findOne({_id:review.restaurant});
        if (!restaurant.reviewsTotal) restaurant.reviewsTotal = 0;
        if (!restaurant.reviewsAverage) restaurant.reviewsAverage = 0;
        restaurant.reviewsTotal += 1;
        restaurant.reviewsAverage = restaurant.reviewsAverage + ((review.rating - restaurant.reviewsAverage) / (restaurant.reviewsTotal + 1));
        await Restaurant.findOneAndReplace({_id:restaurant.id}, restaurant);
    }

    async deleteReview(review) {
        const restaurant = await Restaurant.findOne({_id:review.restaurant});
        restaurant.reviewsTotal -= 1;
        restaurant.reviewsAverage = (restaurant.reviewsAverage * restaurant.reviewsTotal - review.rating) / (restaurant.reviewsTotal - 1);
        await Restaurant.updateOne(restaurant);
    }

    async updateReview(review) {
        const restaurantt = await Restaurant.findOne({_id:review.restaurant});
        restaurant.reviewsTotal -= 1;
        restaurant.reviewsAverage = (restaurant.reviewsAverage * restaurant.reviewsTotal - review.rating) / (restaurant.reviewsTotal - 1);
        restaurant.reviewsTotal += 1;
        restaurant.reviewsAverage = restaurant.reviewsAverage + ((review.rating - restaurant.reviewsAverage) / (restaurant.reviewsTotal + 1));
    }

    async findReviewByUserAndRestaurant(userId, restaurantId) {
        return await this.reviewDao.findByUserAndRestaurant(userId, restaurantId);
    }
}
