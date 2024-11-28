// Imports
import express from "express";
import routes from "./routes/index.js";

// Constants
const PORT = 3000;
const ADDRESS = "127.0.0.1";

const app = express();

// App level middleware
app.use(express.json());

// Establish routers
app.use("/", routes);

app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on port ${PORT}...`);
})