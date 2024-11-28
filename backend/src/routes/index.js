// Index of all routes

import express, { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import restaurantRoutes from "../domains/restaurant/restaurant.routes.js";
import userRoutes from "../domains/user/user.routes.js";

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
