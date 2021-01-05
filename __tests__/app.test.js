process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");

describe("api", () => {
  afterAll(() => {
    return connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("users", () => {
    test("responds with 200 and an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(2);
          expect(body.users[0]).toMatchObject({
            user_id: 1,
            first_name: "Marta",
            last_name: "Moreno",
            username: "butter_bridge",
            phone_number: "07367961308",
            house_number: 22,
            street_name: "Vesper Gate Drive",
            postcode: "LS53NH",
            city: "Leeds",
            uid: "ouq2Vs5hq4afIZiEBV0wIUb8Fk03",
          });
        });
    });
  });
});
