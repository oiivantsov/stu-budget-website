"use strict";

import express from "express";
const router = express.Router();
import { getAll, getByName } from "./restaurant.controller.js"

// GET all
router.get("/all", getAll);

// GET restaurant by name
router.get("/:name", getByName);

export default router;