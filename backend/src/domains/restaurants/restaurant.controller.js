import DAO from "../../services/daos/index.js";
const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = (req, res) => {
  res.json(dao.findAll());
}

export const getByName = (req, res) => {
  const restaurant = dao.findOne(req.params.name);

  if (restaurant === undefined) {
    res.status(404).json({msg: `${req.params.name} not found`});
    return;
  } else if (restaurant === null) {
    res.status(500).json({msg: "Internal server error"});
    return;
  }

  res.json(restaurant);
}