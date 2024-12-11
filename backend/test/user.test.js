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
        .send({ email: data[0].email, password: data[0].password });

    token = user._body.token;
    userId = user._body.id;
});


describe("GET Endpoints", () => {
    describe("GET One user by id", () => {
        test("200 When given correct data", async () => {
            const result = await api.get(`${BASE_URL}/byId/${userId}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body._id).toBe(userId);
        });

        test("400 When given an invalid id", async () => {
            const ID = userId.replace(/^./, "");

            await api
                .get(`${BASE_URL}/byId/${ID}`)
                .expect(400);
        });

        test("404 When given valid but nonexistent id", async () => {
            const ID = userId.replace(/^./, "8");

            await api
                .get(`${BASE_URL}/byId/${ID}`)
                .expect(404);
        });
    });

    test("GET All users", async () => {
        const users = await api.get(`${BASE_URL}/all`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(users._body).toHaveLength(data.length);
    })
});

describe("POST Signup user", () => {
    test("201 When given valid data", async () => {
        const result = await api
            .post(`${BASE_URL}/register`)
            .send({ username: "test4", password: "1234", email: "test4@test.test" })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("token");
    });

    test("400 When given an invalid email", async () => {
        const result = await api
            .post(`${BASE_URL}/register`)
            .send({ username: "test4", password: "1234", email: "test4test.test" })
            .expect(400);
    });
});

describe("POST Login user", () => {
    test("200 When given correct data", async () => {
        const result = await api
            .post(`${BASE_URL}/login`)
            .send({ email: data[0].email, password: data[0].password })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(result.body).toHaveProperty("id");
        expect(result.body).toHaveProperty("token");
    });

    describe("400 When one of the fields is not given", () => {
        test("When email is not given", async () => {
            await api
                .post(`${BASE_URL}/login`)
                .send({ password: data[0].password })
                .expect(400);
        });
        test("When password is not given", async () => {
            await api
                .post(`${BASE_URL}/login`)
                .send({ email: data[0].email })
                .expect(400);
        });
    });

    test("400 When given invalid email", async () => {
        const EMAIL = data[0].email.replace(/@/, "");

        await api
            .post(`${BASE_URL}/login`)
            .send({ email: EMAIL, password: data[0].password })
            .expect(400);
    });

    test("400 When given incorrect password", async () => {
        const PASSWORD = data[0].password.replace(/^./, "");

        await api
            .post(`${BASE_URL}/login`)
            .send({ email: data[0].email, password: PASSWORD })
            .expect(400);
    })
});

describe("PATCH User", () => {
    test("200 When authorized", async () => {
        const patchedUsername = "changedUsername"

        const user = await api.patch(BASE_URL)
            .set("Authorization", `bearer ${token}`)
            .send({ username: patchedUsername })
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(user.body.username).toBe(patchedUsername);

        const getUser = (await api.get(`${BASE_URL}/byId/${userId}`)).body;

        expect(getUser.username).toBe(patchedUsername);
    });

    test("401 When unauthorized", async () => {
        const patchedUsername = "changedUsername"

        await api.patch(BASE_URL)
            .send({ username: patchedUsername })
            .expect(401)
    });
});

describe("DELETE User", () => {
    test("204 When authorized", async () => {
        await api.delete(BASE_URL)
            .set("Authorization", `bearer ${token}`)
            .expect(204);
    })

    test("401 When unauthorized", async () => {
        await api.delete(BASE_URL)
            .expect(401);
    })
});

describe("Favorite endpoints", () => {
    let restaurant = null;

    describe("POST Favorite", () => {
        test("200 When given correct data and authorized", async () => {
            restaurant = await Restaurant.findOne({});

            const result = await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result.body.msg).toBe("Favorite added");
        });

        test("401 When unauthorized", async () => {
            await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .expect(401);
        });

        describe("400 When restaurant id nonexistent or invalid and authorized", () => {
            test("Nonexistent", async () => {
                const ID = restaurant._id.toString().replace(/^./, "8");

                await api
                    .post(`${BASE_URL}/favorite?restaurantId=${ID}`)
                    .set("Authorization", `bearer ${token}`)
                    .expect(400);
            });

            test("Invalid", async () => {
                const ID = restaurant._id.toString().replace(/^./, "");

                await api
                    .post(`${BASE_URL}/favorite?restaurantId=${ID}`)
                    .set("Authorization", `bearer ${token}`)
                    .expect(400);
            });
        })

        test("400 When restaurant already in favorites", async () => {
            await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`)
                .expect(200);

            await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`)
                .expect(400);
        });
    });

    describe("GET Favorites for user", () => {
        test("200 When given correct data", async () => {
            await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`);

            const result = await api
                .get(`${BASE_URL}/favorite?userId=${userId}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(result._body).toHaveLength(1);
        });

        test("404 If given nonexistent id", async () => {
            const ID = userId.replace(/^./, "8");

            await api
                .get(`${BASE_URL}/favorite?userId=${ID}`)
                .expect(404);
        });

        test("400 If given invalid id", async () => {
            const ID = userId.replace(/^./, "");

            await api
                .get(`${BASE_URL}/favorite?userId=${ID}`)
                .expect(400);
        });
    });

    describe("DELETE Favorite", () => {
        test("204 If given correct data and authorized", async () => {
            await api
                .post(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`);

            await api
                .delete(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`)
                .expect(204);
        });

        describe("400 If given nonexistent of invalid id", () => {
            test("Nonexistent", async () => {
                const ID = restaurant._id.toString().replace(/^./, "8");

                await api
                    .delete(`${BASE_URL}/favorite?restaurantId=${ID}`)
                    .set("Authorization", `bearer ${token}`)
                    .expect(400);
            });

            test("Invalid", async () => {
                const ID = restaurant._id.toString().replace(/^./, "");

                await api
                    .delete(`${BASE_URL}/favorite?restaurantId=${ID}`)
                    .set("Authorization", `bearer ${token}`)
                    .expect(400);
            })
        })

        test("400 If given a id that is not in favorites", async () => {
            await api
                .delete(`${BASE_URL}/favorite?restaurantId=${restaurant._id}`)
                .set("Authorization", `bearer ${token}`)
                .expect(400);
        })
    });
});
