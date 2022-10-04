module.exports = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "SequelizeDatabaseError") {
    code = 404;
    message = "Data Not Found";
  } else if (err.code) {
    code = err.code;
    message = err.msg;
  }
  res.status(code).json({
    error: 1,
    message,
  });
};
