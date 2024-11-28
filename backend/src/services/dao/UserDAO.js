import User from "../../db/models/user.model.js";


export default class UserDAO {
    constructor() { }

    // TODO: filter out password
    async findOneById(id) {
        return User.findById(id);
    };

    // TODO: filter out password
    async findOneByEmail(email) {
        return User.findOne({email: email});
    }

    // TODO: filter out password
    async findAll() {
        return User.find();
    };

    async register(user) {
        return User.signup(user);
    };

    async update(id, userData) {
        const updatedFields = {};

        if (userData.username) {
            updatedFields.username = userData.username;
        }

        if (userData.password) {
            updatedFields.password = userData.password;
        }

        if (userData.email) {
            updatedFields.email = userData.email;
        }

        if (userData.reviews) {
            updatedFields.reviews = userData.reviews;
        }

        if (userData.favorites) {
            updatedFields.favorites = userData.favorites;
        }

        return User.updateOne({ _id: id }, updatedFields);
    };

    async delete(id) {
        return User.deleteOne({_id: id});
    };

    async addReview(reviewId, userId) {
        const user = User.find({_id: userId});

        const newReviews = [...user.reviews, reviewId];

        return User.updateOne({_id: userId}, {reviews: newReviews});
    }

    async deleteReview(reviewId, userId) {
        const user = User.find({_id: userId});

        const newReviews = user.reviews.filter(id => id !== reviewId)

        return User.updateOne({_id: userId}, {reviews: newReviews});
    }
}
