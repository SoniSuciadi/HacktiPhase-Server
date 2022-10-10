const app = require("../app");
const request = require("supertest");
const { Thread, Comment, sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
  try {
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
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          comment: "test",
          //   ThreadId: 1,
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
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
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get("/threads");
      expect(response.status).toBe(200);
    });
  });
});

describe("GET /thread/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get("/threads/1");
      expect(response.status).toBe(200);
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).get("/threads/100");
      expect(response.status).toBe(404);
    });
  });
});

describe("POST /threads", () => {
  describe("Success attempt", () => {
    it("Should return status code 201", async () => {
      const response = await request(app).post("/threads");
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("title");
      expect(body).toHaveProperty("content");
    });
  });
});

describe("DELETE /threads/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).delete("/threads/1");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).delete("/threads/100");
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("PUT /threads/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).put("/threads/2");
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).put("/threads/100");
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", expect.any(String));
    });
  });
});
