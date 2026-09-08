const Skill = require("../models/skill.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.status(200).json(new ApiResponse(200, skills, "Skills fetched successfully"));
});

const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json(new ApiResponse(201, skill, "Skill created successfully"));
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true });
  if (!skill) throw new ApiError(404, "Skill not found");
  res.status(200).json(new ApiResponse(200, skill, "Skill updated successfully"));
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  res.status(200).json(new ApiResponse(200, null, "Skill deleted successfully"));
});

module.exports = {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
