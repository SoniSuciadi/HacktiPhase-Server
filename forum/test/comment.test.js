const app = require("../app");
const request = require("supertest");
const { Comment, Thread, User, sequelize } = require("../models");
const { signJwt } = require("../helpers/helper");

let commentId;
let validToken, invalidToken;

beforeAll(async () => {
  try {
    const user = await User.create({
      username: "imran",
    });
    validToken = signJwt(user.id);
    invalidToken = "sdadhagshda21143";
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

describe("GET /comments", () => {
  describe("Success attempt", () => {
    describe("Fetching with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .get("/comments")
          .set({ access_token: validToken });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Fetching with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .get("/comments")
          .set({ access_token: invalidToken });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized");
      });
    });
  });
});

describe("GET /comments/:id", () => {
  describe("Success attempt", () => {
    describe("Fetching with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .get(`/comments/${commentId}`)
          .set({ access_token: validToken });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("comment");
        expect(response.body).toHaveProperty("UserId", expect.any(Number));
      });
    });
  });
  describe("Failed attempts", () => {
    describe("Fetching with invalid token", () => {
      it("Should return statuc code 401", async () => {
        const response = await request(app)
          .get("/comments/1")
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

describe("POST /comments", () => {
  describe("Success attempt", () => {
    describe("Creating with valid token", () => {
      it("Should return status code 201", async () => {
        const response = await request(app)
          .post("/comments")
          .send({ comment: "hello", ThreadId: 1 })
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("comment");
        expect(body).toHaveProperty("ThreadId");
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Creating with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .post("/comments")
          .set({ access_token: invalidToken });
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message");
      });
    });
    describe("Creating without inserting ThreadId or the inserted Thread is undefined", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .post("/comments")
          .send({ comment: "new comment", ThreadId: 0 })
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message");
      });
    });
  });
});

describe("PUT /comments/:id", () => {
  describe("Success attempt", () => {
    describe("Updating with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .put(`/comments/${commentId}`)
          .send({ comment: "new comment", ThreadId: 1 })
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", expect.any(String));
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Updating with invalid token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .put("/comments/1")
          .set({ access_token: invalidToken });
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
    describe("Updating without params or target for updating is empty", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .put("/comments/100")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});

describe("DELETE /comments/:id", () => {
  describe("Success attempt", () => {
    describe("Deleting with valid token", () => {
      it("Should return status code 200", async () => {
        const response = await request(app)
          .delete(`/comments/${commentId}`)
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("msg", expect.any(String));
      });
    });
  });
  describe("Failed attempt", () => {
    describe("Deleting with invalid  token", () => {
      it("Should return status code 401", async () => {
        const response = await request(app)
          .delete("/comments/1")
          .set({ access_token: invalidToken });
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
    describe("Deleting without params or target for deleting is undefined", () => {
      it("Should return status code 404", async () => {
        const response = await request(app)
          .delete("/comments/100")
          .set({ access_token: validToken });
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
      });
    });
  });
});
