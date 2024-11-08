"use strict";


const restaurants = [
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
];

const idCounter = 2;


const addOne = (name, description, coords, address) => {
  const id = idCounter;
  idCounter++;

  restaurants.push({
    id: id,
    name: name,
    description: description,
    coords: coords,
    address: address
  });
};

const getAll = () => {
  return restaurants;
};

const getByName = (name) => {
  name = name.replace(" ", "").toLowerCase();

  const restaurant = restaurants.find(restaurant => {
    const targetName = restaurant.name.replace(" ", "").toLowerCase();

    return name === targetName;
  });

  return restaurant;
};


// Tests
if (require.main === module) {
  console.log("Searched for: Unicafe Kaivopiha");
  console.log("Got: ", getByName("Unicafe Kaivopiha"));
};

// Exports
module.exports = {
  getAll,
  getByName
};
