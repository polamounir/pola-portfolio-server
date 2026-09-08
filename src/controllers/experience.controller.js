const Experience = require("../models/experience.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
  res.status(200).json(new ApiResponse(200, experiences, "Experiences fetched successfully"));
});

const createExperience = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.organization && data.company) data.organization = data.company;
  if (!data.type) data.type = "Experience";
  const experience = await Experience.create(data);
  res.status(201).json(new ApiResponse(201, experience, "Experience created successfully"));
});

const updateExperience = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (!data.organization && data.company) data.organization = data.company;
  const experience = await Experience.findByIdAndUpdate(req.params.id, data, { returnDocument: "after", runValidators: true });
  if (!experience) throw new ApiError(404, "Experience not found");
  res.status(200).json(new ApiResponse(200, experience, "Experience updated successfully"));
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new ApiError(404, "Experience not found");
  res.status(200).json(new ApiResponse(200, null, "Experience deleted successfully"));
});

module.exports = {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
