"use strict";

import { Router } from "express";
import { getOneById, getAll, registerUser, loginUser, updateUser, deleteUser } from "./user.controller.js";
import auth from "../../middlewares/auth.js"


const router = Router();

// GET One user by id
router.get("/byId/:id", getOneById);

// Get All users
router.get("/all", getAll);

// POST New user
router.post("/register",registerUser);

// POST Login user
router.post("/login", loginUser);

// PATCH Update user
router.patch("/:id", auth, updateUser);

// DELETE User
router.delete("/:id", deleteUser);


export default router;
