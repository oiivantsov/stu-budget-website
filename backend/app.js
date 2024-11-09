// Imports
import express from "express";
import routes from "./src/routes/index.js";

// Constants
const PORT = 3000;

const app = express();

// App level middleware
app.use(express.json());

// Establish routers
app.use("/", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
})