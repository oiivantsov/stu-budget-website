// Index of all routes

import { Router } from "express";
import restaurantRoutes from "../domains/restaurants/restaurant.routes.js";

const router = Router();

// Restaurant paths
router.use("/restaurant", restaurantRoutes);

export default router;