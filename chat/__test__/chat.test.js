require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

// jest.setTimeout(5000);

let access_token = jwt.sign(
  {
    id: 1,
  },
  process.env.TOKEN_SECRET
);

let invalid_user_access_token = jwt.sign(
  {
    id: 100,
  },
  process.env.TOKEN_SECRET
);

const user1 = {
  fullName: "User Test",
  email: "user.test@mail.com",
  password: "usertest",
  role: "student",
  PhaseBatchId: 1,
  status: "active",
};

beforeAll((done) => {
  User.create(user1)
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(() => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Chat Routes Test", () => {
  test("201 Post chat and get the chat as returner", (done) => {
    request(app)
      .post("/chats")
      .send({ message: "Haiii", imgUrl: "" })
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "Pesan berhasil ditambah");
        return done();
      });
  });

  test("500 Post chat with wrong access_token", (done) => {
    request(app)
      .post("/chats")
      .send({ message: "Haiii", imgUrl: "" })
      .set("access_token", invalid_user_access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(500);
        expect(body).toHaveProperty("message", "Internal Server Error");
        return done();
      });
  });

  test("200 Get chat return array of chat", (done) => {
    request(app)
      .get("/chats")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        return done();
      });
  });

  test("401 Get chat with wrong access_token", (done) => {
    request(app)
      .get("/chats")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid Token");
        return done();
      });
  });
});
