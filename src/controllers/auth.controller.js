const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, user, "Admin registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken } = await authService.loginUser(email, password);
  
  res.status(200).json(
    new ApiResponse(
      200,
      { user, accessToken },
      "Admin logged in successfully"
    )
  );
});

module.exports = {
  register,
  login,
};
