// Index of all routes

import express, { Router } from "express";
import restaurantRoutes from "../domains/restaurants/restaurant.routes.js";

const router = Router();

// Assets path
router.use("/public", express.static("public"));

// Restaurant paths
router.use("/restaurant", restaurantRoutes);

export default router;