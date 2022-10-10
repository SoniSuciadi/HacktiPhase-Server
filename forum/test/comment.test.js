const app = require("../app");
const request = require("supertest");
const { Comment, Thread, sequelize } = require("../models");
const { queryInterface } = sequelize;

let ThreadId;
let commentId;

beforeAll(async () => {
  try {
    const thread = await Thread.bulkCreate([
      {
        title: "test",
        content: "content",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const comments = await Comment.bulkCreate([
      {
        comment: "test",
        ThreadId: thread[0].id,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    commentId = comments[0].id;
    ThreadId = thread[0].id;
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

describe("GET /comments", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get("/comments");
      //   console.log(response);
      expect(response.status).toBe(200);
    });
  });
});

describe("GET /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get(`/comments/${commentId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", expect.any(Number));
    });
    it("Should return status code 404", async () => {
      const response = await request(app).get("/comments/1000");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("POST /comments", () => {
  describe("Success attempt", () => {
    it("Should return status code 201", async () => {
      const response = await request(app)
        .post("/comments")
        .send({ comment: "hello", ThreadId: 1 });
      const { body, status } = response;
      expect(status).toBe(201);
      expect(body).toHaveProperty("comment");
      expect(body).toHaveProperty("ThreadId");
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).post("/comments");
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message");
    });
  });
});

describe("PUT /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app)
        .put(`/comments/${commentId}`)
        .send({ comment: "new comment", ThreadId: 1 });
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).put("/comments/100");
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("DELETE /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).delete(`/comments/${commentId}`);
      const { body, status } = response;
      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", expect.any(String));
    });
  });
  describe("Failed attempt", () => {
    it("Should return status code 404", async () => {
      const response = await request(app).delete("/comments/100");
      const { body, status } = response;
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", expect.any(String));
    });
  });
});
