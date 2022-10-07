const errorHandler = async (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let msg = "Internal server error";

  if (err.name === "401") {
    code = 401;
    msg = "Invalid token";
  } else if (err.name === "403") {
    code = 403;
    msg = "You are not authorized";
  } else if (err.name === "INVALID_CREDENTIAL") {
    code = 401;
    msg = "Invalid email/password";
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Invalid token";
  } else if (err.name === "404") {
    code = 404;
    msg = "Course not found";
  } else if (err.name === "EMAIL_REQUIRED") {
    code = 400;
    msg = "Email is required";
  } else if (err.name === "PASSWORD_REQUIRED") {
    code = 400;
    msg = "Password is required";
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorHandler;
