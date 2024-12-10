// Imports
import fs from "fs";
import express from "express";
import routes from "./routes/index.js";
import cors from "cors"; // Import CORS middleware
import swaggerUI from "swagger-ui-express";

/*
    We ran into a paralysing syntax error problem with

        import swaggerSpec from "../swagger.json" assert {type: "son"};

    so we decided to get the spec this way.
*/
let swaggerSpec = null;
try {
    const data = fs.readFileSync("./swagger.json", "utf-8");
    swaggerSpec = JSON.parse(data);
} catch (error) {
    console.error(error);
}

// Constants
const PORT = 3000;
const ADDRESS = "0.0.0.0";

const app = express();

// Enable CORS for all routes
app.use(cors());

// App level middleware
app.use(express.json());

// Apply Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Establish routers
app.use("/", routes);

app.listen(PORT, ADDRESS, () => {
    console.log(`Server listening on port ${PORT}...`);
})
