"use strict";

// Imports
import express from "express";
import restaurantRouter from "./src/domains/restaurants/restaurant.routes.js"

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

