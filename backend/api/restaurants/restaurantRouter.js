"use strict";


const express = require("express");
const router = express.Router();
const Handler = require("./restaurantHandlers");

// GET all
router.get("/all", Handler.getAll);

// GET restaurant by name
router.get("/:name", Handler.getByName);


module.exports = router;
