// Imports
import express from "express";
import routes from "./routes/index.js";
import cors from "cors"; // Import CORS middleware

// Constants
const PORT = 3000;
const ADDRESS = "127.0.0.1";

const app = express();

// Enable CORS for all routes
app.use(cors());

// App level middleware
app.use(express.json());

// Establish routers
app.use("/", routes);

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on port ${PORT}...`);
})