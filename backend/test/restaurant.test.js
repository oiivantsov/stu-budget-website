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


describe("When there are restaurants in database", () => {
    test("GET all restaurants", async () => {
        const result = await api.get(`${BASE_URL}/all`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result.body).toHaveLength(DATA_LENGTH);
    });

    describe("GET restaurants by city", () => {
        test("All city fields should be Lappeenranta", async () => {
            const result = await api.get(`${BASE_URL}/city?city=LAPPEENRANTA`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            result.body.forEach(restaurant => {
                expect(restaurant.city).toBe("LAPPEENRANTA");
            });
        });
    });

    describe("GET restaurant by id", () => {
        test("Should return a restaurant with the same id", async () => {
            const restaurants = await api.get(`${BASE_URL}/all`)
                .expect(200);

            const ID = restaurants._body[0]._id;

            const result = await api.get(`${BASE_URL}/id?id=${ID}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);
            
            expect(result._body._id).toBe(ID);
        })
    });
});
