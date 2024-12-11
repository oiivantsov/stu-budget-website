import supertest from "supertest";
import app from "../src/app.js";
import userData from "./data/user.test.data.js";
import User from "../src/db/models/user.model.js";
import Restaurant from "../src/db/models/restaurant.model.js";
import Review from "../src/db/models/review.model.js";


const api = supertest(app);
const BASE_URL = "/review";

if (!process.env.DB_ADDRESS.includes("TEST")) {
    console.error("Server is not using test database");
    process.exit(1);
}

async function createExampleReview() {
}

beforeAll(async () => {
    await User.deleteMany({});
    await Review.deleteMany({});
})

afterAll(async () => {
    await User.deleteMany({});
    await Review.deleteMany({});
})

describe("GET Review by id", () => {
    let exampleReviewId = null;

    beforeAll(async () => {
        const exampleUser = await User.create(userData[0]);
        const exampleRestaurant = await Restaurant.findOne({});

        const exampleReview = await Review.create({
            user: exampleUser._id,
            restaurant: exampleRestaurant._id,
            rating: 3,
            comment: "Very good"
        });

        exampleReviewId = exampleReview._id;
    })

    afterAll(async () => {
        await User.deleteMany({});
        await Review.deleteMany({});
    });

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

describe("GET Reviews for a restaurant", () => {
    let exampleRestaurant = null;

    beforeAll(async () => {
        // Create two reviews for one restaurant

        const userOne = await User.create(userData[0]);
        const userTwo = await User.create(userData[1]);

        exampleRestaurant = await Restaurant.findOne({});

        await Review.create({
            user: userOne._id,
            restaurant: exampleRestaurant._id,
            rating: 3,
            comment: "Good"
        });

        await Review.create({
            user: userTwo._id,
            restaurant: exampleRestaurant._id,
            rating: 1,
            comment: "Bad"
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Review.deleteMany({});
    });

    test("200 When given correct data", async () => {
        const result = await api
            .get(`${BASE_URL}/restaurant?restaurantId=${exampleRestaurant._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result._body).toHaveLength(2);
    });

    describe("400 When given nonexistent or invalid id", () => {
        test("Nonexistent", async () => {
            const ID = exampleRestaurant._id.toString().replace(/^./, "8");

            await api
                .get(`${BASE_URL}/restaurant?restaurantId=${ID}`)
                .expect(404);
        });

        test("Invalid", async () => {
            const ID = exampleRestaurant._id.toString().replace(/^./, "");

            await api
                .get(`${BASE_URL}/restaurant?restaurantId=${ID}`)
                .expect(400);
        });
    });
});

describe("GET Reviews for a user", () => {
    let exampleUser = null;

    beforeAll(async () => {
        // Create two reviews for one user

        exampleUser = await User.create(userData[0]);

        const restaurants = await Restaurant.find({}).limit(2);

        await Review.create({
            user: exampleUser._id,
            restaurant: restaurants[0]._id,
            rating: 3,
            comment: "Good"
        });

        await Review.create({
            user: exampleUser._id,
            restaurant: restaurants[1]._id,
            rating: 1,
            comment: "Bad"
        });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Review.deleteMany({});
    })

    test("200 When given correct data", async () => {
        const result = await api
            .get(`${BASE_URL}/user?userId=${exampleUser._id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result._body).toHaveLength(2);
    });

    describe("400 When given nonexistent or invalid id", () => {
        test("Nonexistent", async () => {
            const ID = exampleUser._id.toString().replace(/^./, "8");

            await api
                .get(`${BASE_URL}/user?userId=${ID}`)
                .expect(404);
        });

        test("Invalid", async () => {
            const ID = exampleUser._id.toString().replace(/^./, "");

            await api
                .get(`${BASE_URL}/user?userId=${ID}`)
                .expect(400);
        });
    });
});

describe("POST Add review", () => {
    let token = null
    let exampleUser = null;
    let exampleRestaurant = null;

    beforeAll(async () => {
        exampleUser = await User.signup(userData[0]);
        exampleRestaurant = await Restaurant.findOne({});

        const loginInfo = await api.post("/user/login")
            .send({ email: userData[0].email, password: userData[0].password});

        token = loginInfo._body.token;
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Review.deleteMany({});
    })

    test("200 When authorized and given correct data", async () => {
        await api
            .post(`${BASE_URL}`)
            .set("Authorization", `bearer ${token}`)
            .send({
                restaurant: exampleRestaurant._id,
                rating: 3,
                comment: "Good"
            })
            .expect(200);
    });

    test("400 When trying to add a second review to the same restaurant", async () => {
        await api
            .post(`${BASE_URL}`)
            .set("Authorization", `bearer ${token}`)
            .send({
                restaurant: exampleRestaurant._id,
                rating: 4,
                comment: "Very good"
            })
            .expect(400);
    });

    test("401 When unauthorized", async () => {
        await api
            .post(`${BASE_URL}`)
            .send({
                restaurant: exampleRestaurant._id,
                rating: 3,
                comment: "Good"
            })
            .expect(401);
    })

    describe("200 When given nonexistent or invalid restaurant id", () => {
        beforeAll(async () => {
            await Review.deleteMany({});
        })

        test("Invalid", async () => {
            const ID = exampleRestaurant._id.toString().replace(/^./, "");

            await api
                .post(`${BASE_URL}`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    restaurant: ID,
                    rating: 3,
                    comment: "Good"
                })
                .expect(400);
        });

        test("Nonexistent", async () => {
            const ID = exampleRestaurant._id.toString().replace(/^./, "8");

            await api
                .post(`${BASE_URL}`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    restaurant: ID,
                    rating: 3,
                    comment: "Good"
                })
                .expect(400);
        });
    });
});
