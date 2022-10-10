const { signJwt } = require("./helpers/helper");

const token = signJwt({
  id: 1,
  role: "instructor",
});

console.log(token);
