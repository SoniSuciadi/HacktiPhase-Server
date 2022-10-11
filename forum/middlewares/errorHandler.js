module.exports = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  // if (
  //   err.name === "SequelizeValidationError" ||
  //   err.name === "SequelizeUniqueConstraintError"
  // ) {
  //   let errors = err.errors.map((el) => {
  //     return el.message;
  //   });
  //   code = 400;
  //   message = errors;
  // } else
  if (err.name === "Not Found") {
    code = 404;
    message = "Content Not Found";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Unauthorized";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};
