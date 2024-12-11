import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import Restaurant from "../src/db/models/restaurant.model.js";


const api = supertest(app);
const DATA_LENGTH = 3;
const BASE_URL = "/restaurant";


if (!process.env.DB_ADDRESS.includes("TEST")) {
    console.error("Server is not using test database");
    process.exit(1);
}


test("GET all restaurants", async () => {
    const result = await api.get(`${BASE_URL}/all`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(result.body).toHaveLength(DATA_LENGTH);
});

describe("GET restaurants by city", () => {
    test(
        "Returns correct restaurants when searching for a city with restaurants (Lappeenranta)",
        async () => {
            const result = await api.get(`${BASE_URL}/city?city=LAPPEENRANTA`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            result.body.forEach(restaurant => {
                expect(restaurant.city).toBe("LAPPEENRANTA");
            });
        });

    test(
        "Returns 404 when searching for a city with no restaurants (Memphis)",
        async () => {
            await api
                .get(`${BASE_URL}/city?city=MEMPHIS`)
                .expect(404);
        }
    );
});

describe("GET restaurant by id", () => {
    let restaurant = null;

    test(
        "Should return a restaurant with the same id when given a correct id",
        async () => {
            const restaurants = await api.get(`${BASE_URL}/all`)
                .expect(200);

            restaurant = restaurants._body[0];

            const ID = restaurant._id;

            const result = await api.get(`${BASE_URL}/id?id=${ID}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result._body._id).toBe(ID);
        });

    test(
        "Should give error 404 when given a valid but nonexistent id",
        async () => {
            const ID = restaurant._id.replace(/^./, "8");

            await api
                .get(`${BASE_URL}/id?id=${ID}`)
                .expect(404);
        }
    );

    test(
        "Should give error 400 when given an invalid id",
        async () => {
            const ID = restaurant._id.replace(/^./, "");

            await api
                .get(`${BASE_URL}/id?id=${ID}`)
                .expect(400);
        }
    );
});
