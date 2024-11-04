const express = require("express");
const app = express();

const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} = require("./tourHandlers"); 

// Middleware to parse JSON
app.use(express.json());

// ROUTES

// GET /tours
app.get("/tours", getAllTours);

// POST /tours
app.post("/tours", createTour);

// GET /tours/:tourId
app.get("/tours/:tourId", getTourById);

// PUT /tours/:tourId
app.put("/tours/:tourId", updateTour);

// DELETE /tours/:tourId
app.delete("/tours/:tourId", deleteTour);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});