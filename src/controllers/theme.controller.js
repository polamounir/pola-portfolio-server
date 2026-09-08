const Theme = require("../models/theme.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getTheme = asyncHandler(async (req, res) => {
  let theme = await Theme.findOne();
  if (!theme) {
    theme = await Theme.create({});
  }
  res.status(200).json(new ApiResponse(200, theme, "Theme settings retrieved successfully"));
});

const updateTheme = asyncHandler(async (req, res) => {
  let theme = await Theme.findOne();
  if (!theme) {
    theme = await Theme.create(req.body);
  } else {
    Object.assign(theme, req.body);
    await theme.save();
  }
  res.status(200).json(new ApiResponse(200, theme, "Theme settings updated successfully"));
});

module.exports = {
  getTheme,
  updateTheme,
};
