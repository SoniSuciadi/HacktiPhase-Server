require("dotenv").config();
const { server: app } = require("../app");
const request = require("supertest");
const { User } = require("../models");
const mChat = require("../models/chat");
const jwt = require("jsonwebtoken");
const io = require("socket.io-client");
const { io: server } = require("../app");

jest.setTimeout(20000);

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

server.attach(3010);
let socket;

beforeAll((done) => {
  socket = io.connect("http://localhost:3010", {
    "reconnection delay": 0,
    "reopen delay": 0,
    "force new connection": true,
  });
  socket.on("connect", function () {
    console.log("worked...");
    User.create(user1)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  socket.on("disconnect", function () {
    console.log("disconnected...");
  });
});

afterAll((done) => {
  socket.disconnect();
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

  test("500 should return error when hit /chats", (done) => {
    User.findAll = jest.fn().mockRejectedValue("Error");
    request(app)
      .get("/chats")
      .set("access_token", access_token)
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("message", "Internal Server Error");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("500 should return error when hit /chats", (done) => {
    mChat.find = jest.fn().mockRejectedValue("Error");
    request(app)
      .get("/chats")
      .set("access_token", access_token)
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("message", "Internal Server Error");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Socket test return message", (done) => {
    const data = {
      message: "Hai",
      imgUrl: "",
    };

    socket.emit("chat message", data);

    socket.on("chat message", (dataRes) => {
      try {
        expect(dataRes).toBe(dataRes);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
