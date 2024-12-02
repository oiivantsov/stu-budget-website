import User from "../../db/models/user.model.js";
import Review from "../../db/models/review.model.js";


export default class UserDAO {
    constructor() { }

    // TODO: filter out password
    async findOneById(id) {
        return User.findById(id);
    };

    // TODO: filter out password
    async findOneByEmail(email) {
        return User.findOne({ email: email });
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
        await Review.deleteMany({user: id});

        return User.deleteOne({ _id: id });
    };

    async addFavorite(userId, favorite) {
        const user = await User.findById(userId);

        user.favorites.forEach(id => {
            if (id.toString() === favorite) {
                throw Error("Already in favorites");
            }
        });

        const newFavorites = [...user.favorites, favorite];

        return User.updateOne({ _id: userId }, {favorites: newFavorites});
    }

    async deleteFavorite(userId, favorite) {
        const user = await User.findOne({ _id: userId });

        const newFavorites = user.favorites.filter(id => id.toString() !== favorite)

        return User.updateOne({ _id: userId }, { favorites: newFavorites });
    }

    async addReview(reviewId, userId) {
        const user = User.findOne({ _id: userId });

        const newReviews = [...user.reviews, reviewId];

        return User.updateOne({ _id: userId }, { reviews: newReviews });
    }

    async deleteReview(reviewId, userId) {
        const user = User.findOne({ _id: userId });

        const newReviews = user.reviews.filter(id => id !== reviewId)

        return User.updateOne({ _id: userId }, { reviews: newReviews });
    }
}
