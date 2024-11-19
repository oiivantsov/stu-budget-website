import { MongooseConnection } from "../../../db/mongodb.js";
import Restaurant from "../../../db/models/restaurant.model.js";

export default class RestaurantDAO {
    constructor() {
        this.db = new MongooseConnection();
    }

    async findOneById(id) {
        return await Restaurant.findOne({_id:id});
    }

    async findByCity(city) {
        return await Restaurant.find({"address.city":city});
    }

    async findAll() {
        return await Restaurant.find();
    }
    async persist(restaurant) {
        return await Restaurant.create(restaurant);
    }

    async update(id, name, category, phone, website, address) {
        try {
            const restaurant = await Restaurant.findOne({_id:id});
            if (name) restaurant.name = name;
            if (category) restaurant.category = category;
            if (phone) restaurant.phone = phone;
            if (website) restaurant.website = website;
            if (address) {
                const { street, postal, city, country } = address;
                if (street) restaurant.address.street = street;
                if (postal) restaurant.address.postal = postal;
                if (city) restaurant.address.city = city;
                if (country) restaurant.address.country = country;
            }
            const updatedRestaurant = await Restaurant.findOneAndReplace({_id:id}, restaurant); // I'd like to use findOneAndUpdate but address nesting makes this rather difficult
            if (updatedRestaurant) return restaurant; // updatedRestaurant holds old information hence we return the object we just updated
            else return null;
        } catch ({name, message}) {
            if (name == "CastError") throw new Error("TypeError");
            else throw new Error("Unknown");
        }
    };

    async delete(id) {
        return await Restaurant.deleteOne({_id:id});
    }

    async findCommentsById(id) {
        try {
            const restaurant = await this.findOneById(id);
            return restaurant ? restaurant.reviews.comments : null;
        } catch ({name, message}) {
            if (name == "CastError") throw new Error("TypeError");
            else throw new Error("Unknown");
        }
    }

    async addReview(restaurantId, userId, rating, comment) {
        try {
            const restaurant = await this.findOneById(restaurantId);
            restaurant.reviews.comments.push({reviewer:userId, rating:rating, comment:comment});
            restaurant.reviews.total += 1;
            restaurant.reviews.average = restaurant.reviews.average + ((rating - restaurant.reviews.average) / (restaurant.reviews.total + 1));
            await Restaurant.findOneAndReplace({_id:restaurant._id}, restaurant);
            return restaurant;
        } catch ({name, message}) {
            if (name == "CastError") throw new Error("TypeError");
            else throw new Error("Unknown");
        }
    }

    async deleteReview(restaurantId, commentId) {
        try {
            const restaurant = await this.findOneById(restaurantId);
            let comments = restaurant.reviews.comments;
            let found = false;

            for (let i = 0; i < comments.length && !found; i++) { // Nested queries are so garbage in mongodb
                const { _id, rating } = comments[i];
                if (_id == commentId) {
                    restaurant.reviews.total -= 1;
                    restaurant.reviews.average = (restaurant.reviews.average * restaurant.reviews.total - rating) / (restaurant.reviews.total - 1);
                    comments = comments.splice(i, 1);
                    found = true;
                }
            }

            if (found) await Restaurant.findOneAndReplace({_id:restaurant._id}, restaurant);
            return found;
        } catch ({name, message}) {
            if (name == "CastError") throw new Error("TypeError");
            else throw new Error("Unknown");
        }
    }

    async editReview(restaurantId, commentId, newRating, newComment) {
        try {
            const restaurant = await this.findOneById(restaurantId);
            let comments = restaurant.reviews.comments;
            let found = false;

            for (let i = 0; i < comments.length && !found; i++) { // Same thing here
                let { _id, rating } = comments[i];
                if (_id == commentId) {
                    if (newRating) {
                        restaurant.reviews.total -= 1;
                        restaurant.reviews.average = (restaurant.reviews.average * restaurant.reviews.total - rating) / (restaurant.reviews.total - 1);
                        rating = newRating;
                        restaurant.reviews.comments[i].rating = rating;
                        restaurant.reviews.total += 1;
                        restaurant.reviews.average = restaurant.reviews.average + ((rating - restaurant.reviews.average) / (restaurant.reviews.total + 1));

                    }
                    if (newComment) restaurant.reviews.comments[i].comment = newComment;
                    found = true;
                }
            }
            if (found) await Restaurant.findOneAndReplace({_id:restaurant._id}, restaurant);
            return found;
        } catch ({name, message}) {
            console.log(message);
            console.log(name);
            if (name == "CastError") throw new Error("TypeError");
            else throw new Error("Unknown");
        }
    }
};