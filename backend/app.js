"use strict";


// Imports
const express = require("express");
const restaurantRouter = require("./api/restaurants/restaurantRouter");


// Constants
const PORT = 3000;

const app = express();

// App level middleware
app.use(express.json());

// Test
app.get("/", (req, res) => res.send("Test working\n"));

// Establish routers
app.use("/restaurants", restaurantRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})

