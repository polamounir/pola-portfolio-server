const NavigationLink = require("../models/navigationLink.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllNavigationLinks = asyncHandler(async (req, res) => {
  const links = await NavigationLink.find().sort({ order: 1 });
  res.status(200).json(new ApiResponse(200, links, "Links fetched successfully"));
});

const createNavigationLink = asyncHandler(async (req, res) => {
  const { name, path, icon, order } = req.body;
  const link = await NavigationLink.create({ name, path, icon, order });
  res.status(201).json(new ApiResponse(201, link, "Link created successfully"));
});

const updateNavigationLink = asyncHandler(async (req, res) => {
  const link = await NavigationLink.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true });
  if (!link) throw new ApiError(404, "Link not found");
  res.status(200).json(new ApiResponse(200, link, "Link updated successfully"));
});

const deleteNavigationLink = asyncHandler(async (req, res) => {
  const link = await NavigationLink.findByIdAndDelete(req.params.id);
  if (!link) throw new ApiError(404, "Link not found");
  res.status(200).json(new ApiResponse(200, null, "Link deleted successfully"));
});

module.exports = {
  getAllNavigationLinks,
  createNavigationLink,
  updateNavigationLink,
  deleteNavigationLink,
};
