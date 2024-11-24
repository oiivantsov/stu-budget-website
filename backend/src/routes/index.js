// Index of all routes

import express, { Router } from "express";
import restaurantRoutes from "../domains/restaurants/restaurant.routes.js";
import userRoutes from "../domains/users/user.routes.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const router = Router();

// Assets path
router.use("/public", express.static("public"));

// Restaurant paths
router.use("/restaurant", restaurantRoutes);

// User paths
router.use("/user", userRoutes);

// Error path - mainly for multer error handling
router.use(errorHandler);

export default router;
