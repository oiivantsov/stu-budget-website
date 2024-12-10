"use strict";

import { Router } from "express";
import { getOneById, getAll, signupUser, loginUser, updateUser, deleteUser,getAllFavoritresForUser, addFavorite, deleteFavorite } from "./user.controller.js";
import auth from "../../middlewares/auth.js"
import { checkParameters } from "../../utils/checkParameters.js";


const router = Router();

// GET One user by id
router.get("/byId/:id", getOneById);

// Get All users
router.get("/all", getAll);

// POST New user
router.post("/register", signupUser);

// POST Login user
router.post("/login", loginUser);

// PATCH Update user
router.patch("/", auth, updateUser);

// DELETE User
router.delete("/", auth, deleteUser);

// GET All favorites

router.get("/favorite/", checkParameters([], [], ["userId"]), getAllFavoritresForUser)


// POST New favorite
router.post("/favorite/", [checkParameters([], [], ["restaurantId"]), auth], addFavorite)

// DELETE Favorite
router.delete("/favorite/", [checkParameters([], [], ["restaurantId"]), auth], deleteFavorite);


export default router;
