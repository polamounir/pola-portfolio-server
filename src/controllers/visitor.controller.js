const Visitor = require("../models/visitor.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllVisitors = asyncHandler(async (req, res) => {
  const visitors = await Visitor.find().sort({ lastVisit: -1 });
  res.status(200).json(new ApiResponse(200, visitors, "Visitors fetched successfully"));
});

const updateVisitorName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const visitor = await Visitor.findByIdAndUpdate(
    req.params.id,
    { name },
    { returnDocument: "after" }
  );

  if (!visitor) {
    throw new ApiError(404, "Visitor not found");
  }

  res.status(200).json(new ApiResponse(200, visitor, "Visitor name updated successfully"));
});

module.exports = {
  getAllVisitors,
  updateVisitorName,
};
