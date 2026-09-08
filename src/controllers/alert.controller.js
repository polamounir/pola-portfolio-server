const Alert = require("../models/alert.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAlert = asyncHandler(async (req, res) => {
  let alert = await Alert.findOne();
  if (!alert) {
    alert = await Alert.create({});
  }
  res.status(200).json(new ApiResponse(200, alert, "Alert settings retrieved successfully"));
});

const updateAlert = asyncHandler(async (req, res) => {
  let alert = await Alert.findOne();
  if (!alert) {
    alert = await Alert.create(req.body);
  } else {
    Object.assign(alert, req.body);
    await alert.save();
  }
  res.status(200).json(new ApiResponse(200, alert, "Alert settings updated successfully"));
});

module.exports = {
  getAlert,
  updateAlert,
};
