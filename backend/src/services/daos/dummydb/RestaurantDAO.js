import { businesses } from "./data.js";

export class RestaurantDAO {
    constructor() {
      this.restaurants = businesses;
    }

    findOne(name) {
        name = name.replace(" ", "").toLowerCase();

        const restaurant = this.restaurants.find(restaurant => {
          const targetName = restaurant.name.replace(" ", "").toLowerCase();
          return name === targetName;
      });
        return restaurant;
      };

    findAll() {
        return this.restaurants;
    }
    persist(item) {};
    update(item) {};
    delete(item) {};

}