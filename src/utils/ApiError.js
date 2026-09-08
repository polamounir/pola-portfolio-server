class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errorDetails = null,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
