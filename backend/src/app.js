// Imports
import express from "express";
import routes from "./routes/index.js";
import cors from "cors"; // Import CORS middleware


const app = express();

// Enable CORS for all routes
app.use(cors());

// App level middleware
app.use(express.json());

// Establish routers
app.use("/", routes);


export default app;
