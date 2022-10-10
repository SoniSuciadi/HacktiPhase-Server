const app = require("../app");
const request = require("supertest");
const { Thread, Comment, User, sequelize } = require("../models");
const { signJwt } = require("../helpers/helper");
const { queryInterface } = sequelize;

let validToken, invalidToken;

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "imran",
    });
    validToken = signJwt(user.id);
    invalidToken = "sdadhagshda21143";
    await queryInterface.bulkInsert(
      "Threads",
      [
        {
          title: "test",
          content: "content",
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    return user;
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Thread.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Comment.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("GET /threads", () => {
  describe("Success attempts", () => {
    describe("Fetching with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .get("/threads")
          .set("access_token", validToken);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
      });
    });
  });
  describe("Failed attempts", () => {
    describe("Fetching with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .get("/threads")
          .set("access_token", invalidToken);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
  });
});

describe("GET /thread/:id", () => {
  describe("Success attempt", () => {
    describe("Fetching with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .get("/threads/1")
          .set({ access_token: validToken });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", expect.any(Number));
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Fetching with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .get("/threads/1")
          .set({ access_token: invalidToken });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
    describe("Content not found", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .get("/threads/100")
          .set({ access_token: validToken });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Content Not Found");
      });
    });
  });
});

describe("POST /threads", () => {
  describe("Success attempt", () => {
    describe("Creating with valid token", () => {
      it("Should return status code 201", async () => {
        const response = await request(app)
          .post("/threads")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("content");
      });
    });
  });
  describe("Creating with invalid token", () => {
    it("Should return status code 401", async () => {
      const response = await request(app)
        .post("/threads")
        .set({ access_token: invalidToken });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Unauthorized");
    });
  });
});

describe("PUT /threads/:id", () => {
  describe("Success attempt", () => {
    describe("Updating with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .put("/threads/1")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", expect.any(String));
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Updating with invalid token", () => {
      it("Should return statuc code 401", async () => {
        const response = await request(app)
          .put("/threads/1")
          .set({ access_token: invalidToken });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
    describe("Deleting with empty params or the content is not found", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .put("/threads/100")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});

describe("DELETE /threads/:id", () => {
  describe("Success attempt", () => {
    describe("Deleting with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .delete("/threads/1")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", expect.any(String));
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Deleting with invalid token", () => {
      it("Should return statuc code 401", async () => {
        const response = await request(app)
          .delete("/threads/1")
          .set({ access_token: invalidToken });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
    describe("Deleting with empty params or the content is not found", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .delete("/threads/100")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});
