import User from "../../../db/models/user.model.js";


export class UserDAO {
    constructor() { }

    async findOneById(id) {
        return User.findById(id);
    };

    async findAll() {
        return User.find();
    };

    async persist(user) {
        return User.create(user);
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

}
