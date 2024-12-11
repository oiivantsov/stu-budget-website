import supertest from "supertest";
import app from "../src/app.js";
import userData from "./data/user.test.data.js";
import User from "../src/db/models/user.model.js";
import Restaurant from "../src/db/models/restaurant.model.js";
import Review from "../src/db/models/review.model.js";


const api = supertest(app);
const BASE_URL = "/review";

const exampleUser = await User.findOne({});

const exampleRestaurant = await Restaurant.findOne({});

const exampleReview = {
    user: exampleUser._id,
    restaurant: exampleRestaurant._id,
    rating: 3,
    comment: "Very nice restaurant"
};

if (!process.env.DB_ADDRESS.includes("TEST")) {
    console.error("Server is not using test database");
    process.exit(1);
}

let exampleReviewId = null;

beforeAll(async () => {
    await Review.deleteMany({});
    exampleReviewId = (await Review.create(exampleReview))._id;
})

describe("GET Review by id", () => {
    test("200 When given correct data", async () => {
        await api
            .get(`${BASE_URL}/?reviewId=${exampleReviewId}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    describe("400 When given nonexistent or invalid id", () => {
        test("Nonexistent", async () => {
            const ID = exampleReviewId.toString().replace(/^./, "8");

            await api
                .get(`${BASE_URL}/?reviewId=${ID}`)
                .expect(404);
        });

        test("Invalid", async () => {
            const ID = exampleReviewId.toString().replace(/^./, "");

            await api
                .get(`${BASE_URL}/?reviewId=${ID}`)
                .expect(400);
        });
    });
});
