"use strict";

import { Router } from "express";
import { getOneById, getAll, createUser, updateUser, deleteUser } from "./user.controller.js";


const router = Router();

// GET One user by id
router.get("/byId/:id", getOneById);

// Get All users
router.get("/all", getAll);

// POST New user
router.post("/new", createUser);

// PATCH Update user
router.patch("/:id", updateUser);

// DELETE User
router.delete("/:id", deleteUser);


export default router;
