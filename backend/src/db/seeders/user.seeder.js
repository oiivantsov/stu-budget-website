"use strict";

import usersData from "../exampleData/usersData.js";

const BASE_URL = "http://localhost:3000/user";


const seedUser = async (user) => {
    const url = BASE_URL + "/register";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


usersData.forEach(user => {
    seedUser(user);
})
