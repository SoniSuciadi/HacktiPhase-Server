const { signJwt } = require("./helpers");

const token = signJwt({
  id: 34,
  role: "instructor",
  PhaseId: 1,
  PhaseBatchId: 1,
});
console.log(token);
