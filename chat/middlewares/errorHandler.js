const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  switch (err.name) {
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
  }
  res.status(status).json({
    message,
  });
};
module.exports = errorHandler;
