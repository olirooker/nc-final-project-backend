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
  describe("/users", () => {
    test("GET - 200 returns all users", () => {
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

    test("POST - 201 ", () => {
      return request(app)
        .post("/api/users")
        .send({
          first_name: "Martin",
          last_name: "Moreman",
          username: "butter_tunnel",
          phone_number: "07367963912",
          house_number: 25,
          street_name: "Nesper Date Grive",
          postcode: "LS54FD",
          city: "Lincoln",
          uid: "ouq2Vs5hq4afIZiEBV0wIUb8Fk05",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            user_id: 3,
            first_name: "Martin",
            last_name: "Moreman",
            username: "butter_tunnel",
            phone_number: "07367963912",
            house_number: 25,
            street_name: "Nesper Date Grive",
            postcode: "LS54FD",
            city: "Lincoln",
            uid: "ouq2Vs5hq4afIZiEBV0wIUb8Fk05",
          });
        });
    });
  });

  describe("/users/:uid", () => {
    test("GET - 200 returns correct user by uid - A", () => {
      return request(app)
        .get("/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
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

    test("GET - 200 returns correct user by uid - B", () => {
      return request(app)
        .get("/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            user_id: 2,
            first_name: "Peter",
            last_name: "Parker",
            username: "owais1996",
            phone_number: "07712268504",
            house_number: 59,
            street_name: "Leighbrook Road",
            postcode: "M146DW",
            city: "Manchester",
            uid: "ouq2Vs5hq4afIZiEBV0wIUb8Fk04",
          });
        });
    });
  });
});
