import supertest from "supertest";
import app from "../src/app.js";
import data from "./data/user.test.data.js";
import User from "../src/db/models/user.model.js";
import Restaurant from "../src/db/models/restaurant.model.js";


const api = supertest(app);
const BASE_URL = "/user";


if (!process.env.DB_ADDRESS.includes("TEST")) {
    console.error("Server is not using test database");
    process.exit(1);
}

let token = null;
let userId = null;

beforeEach(async () => {
    await User.deleteMany({});

    for (let i = 0; i < data.length; i++) {
        await api.post("/user/register")
            .send(data[i]);
    }

    const user = await api.post("/user/login")
        .send({email: data[0].email, password: data[0].password});

    token = user._body.token;
    userId = user._body.id;
});


describe("GET Endpoints", () => {
    test("GET One user by id", async () => {
        const result = await api.get(`${BASE_URL}/byId/${userId}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result.body._id).toBe(userId);
    });

    test("GET All users", async () => {
        const users = await api.get(`${BASE_URL}/all`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
            
        expect(users._body).toHaveLength(data.length);
    })
});

test("PATCH User", async () => {
    const patchedUsername = "changedUsername"

    const user = await api.patch(BASE_URL)
        .set("Authorization", `bearer ${token}`)
        .send({username: patchedUsername})
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(user.body.username).toBe(patchedUsername);
  
    const getUser = (await api.get(`${BASE_URL}/byId/${userId}`)).body;

    expect(getUser.username).toBe(patchedUsername);
});

test("DELETE User", async () => {
    await api.delete(BASE_URL)
        .set("Authorization", `bearer ${token}`)
        .expect(204);
});

describe("Favorite endpoints", () => {
    let restaurant = null;

    test("POST Favorite", async () => {
        restaurant = await Restaurant.findOne({});

        const result = await api
            .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
            .set("Authorization", `bearer ${token}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result.body.msg).toBe("Favorite added");
    });

    test("GET Favorites for user", async () => {
        await api
            .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
            .set("Authorization", `bearer ${token}`);

        const result = await api
            .get(`${BASE_URL}/favorite?userId=${userId}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        
        expect(result._body).toHaveLength(1);
    });

    test("DELETE Favorite", async () => {
        await api
            .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
            .set("Authorization", `bearer ${token}`);

        await api
            .delete(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
            .set("Authorization", `bearer ${token}`)
            .expect(204);
    });
});
