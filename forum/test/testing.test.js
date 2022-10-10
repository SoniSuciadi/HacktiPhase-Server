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

describe("GET /comments", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get("/comments");
      expect(response.status).toBe(200);
    });
  });
});

describe("GET /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).get("/comments/1");
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

describe("DELETE /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).delete("/comments/1");
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

describe("PUT /comments/:id", () => {
  describe("Success attempt", () => {
    it("Should return status code 200", async () => {
      const response = await request(app).put("/comments/1");
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
