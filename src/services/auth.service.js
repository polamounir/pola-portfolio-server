const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const generateAccessTokens = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return accessToken;
};

const registerUser = async (userData) => {
  const { username, email, password } = userData;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return createdUser;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = await generateAccessTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  return { user: loggedInUser, accessToken };
};

module.exports = {
  registerUser,
  loginUser,
};
