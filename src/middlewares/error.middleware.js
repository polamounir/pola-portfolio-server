const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If the error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof require("mongoose").Error ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || null, err.stack);
  }

  // Define the standard error response structure
  const response = {
    success: false,
    message: error.message,
    data: null,
    error: error.errorDetails || error.message,
    statusCode: error.statusCode,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
