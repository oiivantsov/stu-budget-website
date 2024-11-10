import { Router } from "express";
const router = Router();
import { getAll, getByName, getNearby } from "./restaurant.controller.js"

// GET all
router.get("/all", getAll);

// GET restaurant by name
router.get("/:name", getByName);

// GET nearby restaurants
router.get("/nearby/:street/:city/:limit", getNearby);

export default router;
