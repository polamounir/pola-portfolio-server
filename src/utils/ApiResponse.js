class ApiResponse {
  constructor(statusCode, data, message = "Operation successful") {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    this.error = null;
    this.statusCode = statusCode;
  }
}

module.exports = ApiResponse;
