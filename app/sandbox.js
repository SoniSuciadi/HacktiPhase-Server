const { signJwt } = require("./helpers");

const token = signJwt({
  id: 1,
  role: "student",
  PhaseId: 4,
  PhaseBatchId: 1,
});
console.log(token);
