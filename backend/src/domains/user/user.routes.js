"use strict";

import { Router } from "express";
import { getOneById, getAll, registerUser, loginUser, updateUser, deleteUser, addFavorite, deleteFavorite } from "./user.controller.js";
import auth from "../../middlewares/auth.js"
import { checkParameters } from "../../utils/checkParameters.js";


const router = Router();

// GET One user by id
router.get("/byId/:id", getOneById);

// Get All users
router.get("/all", getAll);

// POST New user
router.post("/register", registerUser);

// POST Login user
router.post("/login", loginUser);

// PATCH Update user
router.patch("/:id", auth, updateUser);

// DELETE User
router.delete("/:id", deleteUser);

// POST New favorite
router.post("/favorite/add", [checkParameters([], [], ["restaurantId"]), auth], addFavorite)

// DELETE Favorite
router.delete("/favorite/delete", [checkParameters([], [], ["restaurantId"]), auth], deleteFavorite);


export default router;
