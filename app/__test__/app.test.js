require("dotenv").config();
const app = require("../app");
const request = require("supertest");
const { Assignment, AssignmentDetail, Batch, Journey, Material, Phase, PhaseBatch, StudentJourney, User } = require("../models");
const jwt = require("jsonwebtoken");
const data = require("../seed.json");

jest.setTimeout(1000);

let access_token = jwt.sign(
  {
    id: 1,
  },
  process.env.TOKEN_SECRET
);

let access_token_instructor = jwt.sign(
  {
    id: 35,
  },
  process.env.TOKEN_SECRET
);

beforeAll((done) => {
  Batch.bulkCreate(data.batches)
    .then((_) => {
      return Phase.bulkCreate(data.phases);
    })
    .then((_) => {
      return PhaseBatch.bulkCreate(data.phasebatch);
    })
    .then((_) => {
      return Material.bulkCreate(data.materials);
    })
    .then((_) => {
      return Assignment.bulkCreate(data.assignments);
    })
    .then((_) => {
      return Journey.bulkCreate(data.journeys);
    })
    .then((_) => {
      return User.bulkCreate(data.users);
    })
    .then((_) => {
      return StudentJourney.bulkCreate(data.studentjourney);
    })
    .then((_) => {
      return AssignmentDetail.bulkCreate(data.assignmentdetail);
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  AssignmentDetail.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      return StudentJourney.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return Journey.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return Assignment.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return Material.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return PhaseBatch.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return Phase.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return Batch.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      return User.destroy({ truncate: true, cascade: true, restartIdentity: true });
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

const newAssignment = {
  title: "Vue Challange 1",
  description: "Create application using vue",
  link: "google.com",
  day: 2,
  week: 1,
  deadline: 10080,
  scorePercentage: 20,
  PhaseId: 3,
};

describe("Assignment Routes Test", () => {
  describe("GET /assignment", () => {
    test("200 success get assignment, return array", (done) => {
      request(app)
        .get("/assignment")
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

    test("401 get assignment with invalid token", (done) => {
      request(app)
        .get("/assignment")
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

    test("401 get assignment with no token", (done) => {
      request(app)
        .get("/assignment")
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

  describe("GET /assignment/:id", () => {
    test("200 success get assignment by id, return object", (done) => {
      request(app)
        .get("/assignment/1")
        .set("access_token", access_token_instructor)
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

    test("401 get assignment by id with invalid token", (done) => {
      request(app)
        .get("/assignment/1")
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

    test("401 get assignment by id with no token", (done) => {
      request(app)
        .get("/assignment/1")
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

  describe("GET /assignment/week/:id", () => {
    test("200 success get assignment per week, return object", (done) => {
      request(app)
        .get("/assignment/week/2")
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

    test("401 get assignment per week with invalid token", (done) => {
      request(app)
        .get("/assignment/week/1")
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

    test("401 get assignment per week with no token", (done) => {
      request(app)
        .get("/assignment/1")
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

  describe("PATCH /assignment/:id", () => {
    test("200 success edit score", (done) => {
      request(app)
        .patch("/assignment/1")
        .send([{ id: 1, score: 90 }])
        .set("access_token", access_token_instructor)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("msg", "Score updated");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit score with invalid token", (done) => {
      request(app)
        .patch("/assignment/1")
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

    test("401 edit score user with no token", (done) => {
      request(app)
        .patch("/assignment/1")
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

    // test("401 edit score with student token", (done) => {
    //   request(app)
    //     .patch("/assignment/1")
    //     .set("access_token", access_token)
    //     .then((response) => {
    //       const { body, status } = response;
    //       expect(status).toBe(401);
    //       expect(body).toHaveProperty("message", "Unauthorized");
    //       done();
    //     })
    //     .catch((err) => {
    //       done(err);
    //     });
    // });
  });
});

describe("Material Routes Test", () => {
  describe("GET /material", () => {
    test("200 success get material, return array", (done) => {
      request(app)
        .get("/material")
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

    test("401 get material with invalid token", (done) => {
      request(app)
        .get("/material")
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

    test("401 get material with no token", (done) => {
      request(app)
        .get("/material")
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

  describe("GET /material/:id", () => {
    test("200 success get material by id, return object", (done) => {
      request(app)
        .get("/material/5")
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

    test("401 get material by id with invalid token", (done) => {
      request(app)
        .get("/material/1")
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

    test("401 get material by id with no token", (done) => {
      request(app)
        .get("/assignment/1")
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

  describe("GET /material/week/:id", () => {
    test("200 success get material per week, return object", (done) => {
      request(app)
        .get("/material/week/2")
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

    test("401 get material per week with invalid token", (done) => {
      request(app)
        .get("/material/week/1")
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

    test("401 get material per week with no token", (done) => {
      request(app)
        .get("/material/1")
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

describe("Journey Routes Test", () => {
  describe("GET /journey/assignment/:AssignmentId", () => {
    test("200 success get journey, return array", (done) => {
      request(app)
        .get("/journey/assignment/1")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get journey with invalid token", (done) => {
      request(app)
        .get("/journey/assignment/1")
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

    test("401 get journey with no token", (done) => {
      request(app)
        .get("/journey/assignment/1")
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

  describe("GET /journey/detail/:AssignmentId/:UserId", () => {
    test("200 success get Journey detail, return object", (done) => {
      request(app)
        .get("/journey/detail/1/1")
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

    test("401 get journey detail with invalid token", (done) => {
      request(app)
        .get("/journey/detail/1/1")
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

    test("401 get journey detail with no token", (done) => {
      request(app)
        .get("/journey/detail/1/1")
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

  describe("PATCH /journey/:StudentJourneyId", () => {
    test("200 success patch status journey", (done) => {
      request(app)
        .patch("/journey/1")
        .set("access_token", access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          return done();
        });
    });

    test("404 Journey not found", (done) => {
      request(app)
        .patch("/journey/1000")
        .set("access_token", access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Journey not found");
          return done();
        });
    });
  });
});

describe("PhaseBatch Routes Test", () => {
  describe("GET /phasebatch", () => {
    test("200 success get phasebatch, return array", (done) => {
      request(app)
        .get("/phasebatch")
        .set("access_token", access_token_instructor)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get phasebatch with invalid token", (done) => {
      request(app)
        .get("/phasebatch")
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

    test("401 get phasebatch with no token", (done) => {
      request(app)
        .get("/phasebatch")
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

    test("401 get phasebatch with student token", (done) => {
      request(app)
        .get("/phasebatch")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /phasebatch/user", () => {
    test("200 success get phasebatch, return array", (done) => {
      request(app)
        .get("/phasebatch/user")
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 get phasebatch with invalid token", (done) => {
      request(app)
        .get("/phasebatch/user")
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

    test("401 get phasebatch with no token", (done) => {
      request(app)
        .get("/phasebatch/user")
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

describe("User Routes Test", () => {
  describe("PATCH user/activate", () => {
    test("200 success edit users status to active ", (done) => {
      request(app)
        .patch("/user/activate")
        .send({ users: [1, 2, 3] })
        .set("access_token", access_token_instructor)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit with invalid token", (done) => {
      request(app)
        .patch("/user/activate")
        .send({ users: [1, 2, 3] })
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

    test("401 edit status user with no token", (done) => {
      request(app)
        .patch("/user/activate")
        .send({ users: [1, 2, 3] })
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

    test("401 edit status with student token", (done) => {
      request(app)
        .patch("/user/activate")
        .send({ users: [1, 2, 3] })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH user/inactivate", () => {
    test("200 success edit users status to inactive ", (done) => {
      request(app)
        .patch("/user/inactivate")
        .send({ users: [1, 2, 3] })
        .set("access_token", access_token_instructor)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit with invalid token", (done) => {
      request(app)
        .patch("/user/inactivate")
        .send({ users: [1, 2, 3] })
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

    test("401 edit status user with no token", (done) => {
      request(app)
        .patch("/user/inactivate")
        .send({ users: [1, 2, 3] })
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

    test("401 edit status with student token", (done) => {
      request(app)
        .patch("/user/inactivate")
        .send({ users: [1, 2, 3] })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH user/migrate", () => {
    test("200 success edit users status to inactive ", (done) => {
      request(app)
        .patch("/user/migrate")
        .send({ users: [1, 2, 3], phaseBatchId: 1 })
        .set("access_token", access_token_instructor)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 edit with invalid token", (done) => {
      request(app)
        .patch("/user/migrate")
        .send({ users: [1, 2, 3], phaseBatchId: 1 })
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

    test("401 edit status user with no token", (done) => {
      request(app)
        .patch("/user/migrate")
        .send({ users: [1, 2, 3], phaseBatchId: 1 })
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

    test("401 edit status with student token", (done) => {
      request(app)
        .patch("/user/migrate")
        .send({ users: [1, 2, 3], phaseBatchId: 1 })
        .set("access_token", access_token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

describe("All endpoint should return error", () => {
  describe("Assignment", () => {
    test("Should be return error when hit /assignment", (done) => {
      Assignment.findAll = jest.fn().mockRejectedValue("Error");
      request(app)
        .get("/assignment")
        .set("access_token", access_token_instructor)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty("message", "Internal Server Error");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("Should be return error when hit /assignment/week/:id", (done) => {
      Assignment.findAll = jest.fn().mockRejectedValue("Error");
      request(app)
        .get("/assignment/week/1")
        .set("access_token", access_token_instructor)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty("message", "Internal Server Error");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("Should be return error when patch /assignment/:id", (done) => {
      AssignmentDetail.findOne = jest.fn().mockRejectedValue("Error");
      request(app)
        .patch("/assignment/1")
        .set("access_token", access_token_instructor)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty("message", "Internal Server Error");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
