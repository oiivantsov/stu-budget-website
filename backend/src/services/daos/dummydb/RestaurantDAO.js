export class RestaurantDAO {
    constructor() {
      this.restaurants = [
        {
          id: 0,
          name: "Unicafe Kaivopiha",
          description: "lorem ipsum dolores",
          coords: [60.169394369742655, 24.94081059084439],
          address: "Mannerheimintie 3, 00100 Helsinki"
        },
        {
          id: 1,
          name: "Unicafe Meilahti",
          description: "lorem ipsum dolores",
          coords: [60.19048811715621, 24.908967598920377],
          address: "Haartmaninkatu 3, 00290 Helsinki"
        }
      ]
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