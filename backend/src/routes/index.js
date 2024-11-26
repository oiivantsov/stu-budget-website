// Index of all routes

import express, { Router } from "express";
import restaurantRoutes from "../domains/restaurant/restaurant.routes.js";
import userRoutes from "../domains/user/user.routes.js";

const router = Router();

// Assets path
router.use("/public", express.static("public"));

// Restaurant paths
router.use("/restaurant", restaurantRoutes);

// User paths
router.use("/user", userRoutes);

export default router;
