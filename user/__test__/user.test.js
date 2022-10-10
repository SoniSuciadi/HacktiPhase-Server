require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const { payloadToToken } = require("../helper/helper");
const jwt = require("jsonwebtoken");

jest.setTimeout(1000);

let access_token = jwt.sign(
  {
    id: 1,
  },
  process.env.TOKEN_SECRET
);

let invalid_user_access_token = jwt.sign(
  {
    id: 10,
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

const user2 = {
  fullName: "User Test 2",
  email: "user.test2@mail.com",
  password: "usertest2",
  role: "student",
  PhaseBatchId: 1,
  status: "active",
};

beforeAll((done) => {
  User.create(user2)
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("User Routes Test", () => {
  describe("POST /register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("fullName", user1.fullName);
          expect(body).toHaveProperty("email", user1.email);
          return done();
        });
    });

    test("400 Failed register - should return error if fullName is null", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "user.test@mail.com",
          password: "usertest",
          role: "student",
          PhaseBatchId: 1,
          status: "active",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Name can not be null");
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/register")
        .send({
          fullName: "Test Name",
          password: "usertest",
          role: "student",
          PhaseBatchId: 1,
          status: "active",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email can not be null");
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email already used");
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "random",
          fullName: "Sample User",
          password: "qweqwe",
          role: "student",
          PhaseBatchId: 1,
          status: "active",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Please use right email format");
          return done();
        });
    });

    test("400 Failed register - should return error if password is null", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "random@mail.com",
          fullName: "Sample User",
          role: "student",
          PhaseBatchId: 1,
          status: "active",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password can not be null");
          return done();
        });
    });

    test("400 Failed register - should return error if role is null", (done) => {
      request(app)
        .post("/register")
        .send({
          fullName: "Ada deh",
          email: "user.test@mail.com",
          password: "usertest",
          PhaseBatchId: 1,
          status: "active",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Role can not be null");
          return done();
        });
    });
  });

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/login")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "hello@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid email/password");
          return done();
        });
    });

    test("400 Failed login - should return error", (done) => {
      request(app)
        .post("/login")
        .send({
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is required");
          return done();
        });
    });

    test("400 Failed login - should return error", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "hello@mail.com",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Password is required");
          return done();
        });
    });
  });

  describe("GET /users", () => {
    test("200 Success get user, return array", (done) => {
      request(app)
        .get("/users")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          expect(body.length).toBeGreaterThan(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get users with invalid token", (done) => {
      request(app)
        .get("/users")
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get users with no token", (done) => {
      request(app)
        .get("/users")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/:id", () => {
    test("200 Success get user by id, return object", (done) => {
      request(app)
        .get("/users/1")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toBeInstanceOf(Object);
          expect(body).toHaveProperty("id", expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get users by id with invalid token", (done) => {
      request(app)
        .get("/users/1")
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("404 get users by id with invalid id", (done) => {
      request(app)
        .get("/users/10")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Not found");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PUT /users/:id", () => {
    test("200 success edit user", (done) => {
      request(app)
        .put("/users/1")
        .send({ fullName: "Edit User Test 2", email: "user.test2@mail.com", password: "usertest2", role: "student", PhaseBatchId: 1, status: "active" })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("msg", "User with id 1 updated successfully");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit users with invalid token", (done) => {
      request(app)
        .put("/users/1")
        .send({ fullName: "Edit User Test 2", email: "user.test2@mail.com", password: "usertest2", role: "student", PhaseBatchId: 1, status: "active" })
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("500 edit users with uncomplete key", (done) => {
      request(app)
        .put("/users/1")
        .send({ fullName: "Edit User Test 2" })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("message", "Internal server error");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH /users/:id", () => {
    test("200 success edit user", (done) => {
      request(app)
        .patch("/users/1")
        .send({ status: "inactive" })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("msg", "User with id 1 status updated to inactive");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit users with invalid token", (done) => {
      request(app)
        .patch("/users/1")
        .send({ status: "inactive" })
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit users with not found user token", (done) => {
      request(app)
        .patch("/users/1")
        .send({ status: "inactive" })
        .set("access_token", invalid_user_access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("DELETE /users/:id", () => {
    test("200 success delete user", (done) => {
      request(app)
        .delete("/users/1")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("msg", "User with id 1 deleted");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 delete users with invalid token", (done) => {
      request(app)
        .delete("/users/1")
        .set("access_token", "ini invalid token")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 delete users with no token", (done) => {
      request(app)
        .delete("/users/1")
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
