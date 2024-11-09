import DAO from "../../services/daos/index.js";
const { RestaurantDAO } = DAO;
const dao = new RestaurantDAO();

export const getAll = async (req, res) => {
  res.json(await dao.findAll());
}

export const getByName = async (req, res) => {
  const restaurant = await dao.findOne(req.params.name);

  if (restaurant === undefined) {
    res.status(404).json({msg: `${req.params.name} not found`});
    return;
  } else if (restaurant === null) {
    res.status(500).json({msg: "Internal server error"});
    return;
  }

  res.json(restaurant);
}