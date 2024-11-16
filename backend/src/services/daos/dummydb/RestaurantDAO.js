import { businesses } from "./data.js";

export class RestaurantDAO {
    constructor() {
      this.restaurants = businesses;
    }

    async findOneByName(name) {
        name = name.replace(" ", "").toLowerCase();

        const restaurant = this.restaurants.find(restaurant => {
          const targetName = restaurant.name.replace(" ", "").toLowerCase();
          return name === targetName;
      });
        return restaurant;
      };

    async findOneById(id) {
      return this.restaurants.find(restaurant => restaurant.id === id);
    }

    async findAll() {
        return this.restaurants;
    }
    async persist(item) {};
    async update(item) {};
    async delete(item) {};

}
