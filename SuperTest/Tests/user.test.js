const request = require("supertest");
const userController = require("../controllers/user");
const app = require("../app");

describe("User controller", () => {
  beforeAll(() => {
    app.use(userController);
  });

  test("GET / endpoint returns all users", async (done) => {
    const res = await request(app).get("/");
    const { body, statusCode } = res;
    expect(body).toEqual("Return all the users");
    expect(statusCode).toEqual(200);
    done();
  });

  test("GET /:id endpoint returns the correct user", async (done) => {
    const res = await request(app).get("/user1");
    const { body, statusCode } = res;

    expect(body).toEqual("user 1 returned");
    expect(statusCode).toEqual(200);
    done();
  });

  test("GET /:id endpoint returns the correct error", async (done) => {
    const res = await request(app).get("/user2");
    const { body, statusCode } = res;

    expect(body).toEqual("user not found");
    expect(statusCode).toEqual(404);
    done();
  });

  test("POST / endpoint returns the correct response", async (done) => {
    const res = await request(app)
      .post("/")
      .set("Accept", "application/json")
      .send({
        id: "user1",
      });
    const { body, statusCode } = res;
    expect(body).toEqual({ id: "user1" });
    expect(statusCode).toEqual(201);
    done();
  });

  afterAll(() => {
    app.listen().close();
  });
});
