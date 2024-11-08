"use strict";


const Model = require("./restaurantModel");


const getAll = (req, res) => {
  res.json(Model.getAll());
}

const getByName = (req, res) => {
  const restaurant = Model.getByName(req.params.name);

  if (restaurant === undefined) {
    res.status(404).json({msg: `${req.params.name} not found`});
    return;
  } else if (restaurant === null) {
    res.status(500).json({msg: "Internal server error"});
    return;
  }

  res.json(restaurant);
}


module.exports = {
  getByName,
  getAll
}
