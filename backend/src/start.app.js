import app from "./app.js";


// Constants
const PORT = 3000;
const ADDRESS = "127.0.0.1";

app.listen(PORT, ADDRESS, () => {
    console.log(`Server listening on port ${PORT}...`);
    if (process.env.DB_ADDRESS.includes("TEST")) {
        console.log("SERVER RUNNING WITH TEST DATABASE");
    }
})
