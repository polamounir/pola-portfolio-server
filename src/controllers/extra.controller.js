const Certification = require("../models/certification.model");
const Tool = require("../models/tool.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// --- Certifications Controllers ---
const getAllCertifications = asyncHandler(async (req, res) => {
  const certs = await Certification.find().sort({ order: 1, createdAt: 1 });
  res.status(200).json(new ApiResponse(200, certs, "Certifications fetched successfully"));
});

const createCertification = asyncHandler(async (req, res) => {
  const { name, year, order } = req.body;
  if (!name || !year) throw new ApiError(400, "Name and year are required");
  const cert = await Certification.create({
    name,
    year,
    order: order ? Number(order) : 0,
  });
  res.status(201).json(new ApiResponse(201, cert, "Certification created successfully"));
});

const updateCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!cert) throw new ApiError(404, "Certification not found");
  res.status(200).json(new ApiResponse(200, cert, "Certification updated successfully"));
});

const deleteCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findByIdAndDelete(req.params.id);
  if (!cert) throw new ApiError(404, "Certification not found");
  res.status(200).json(new ApiResponse(200, null, "Certification deleted successfully"));
});

// --- Tools Controllers ---
const getAllTools = asyncHandler(async (req, res) => {
  const tools = await Tool.find().sort({ order: 1, createdAt: 1 });
  res.status(200).json(new ApiResponse(200, tools, "Tools fetched successfully"));
});

const createTool = asyncHandler(async (req, res) => {
  const { name, order } = req.body;
  if (!name) throw new ApiError(400, "Tool name is required");
  const tool = await Tool.create({
    name,
    order: order ? Number(order) : 0,
  });
  res.status(201).json(new ApiResponse(201, tool, "Tool created successfully"));
});

const updateTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!tool) throw new ApiError(404, "Tool not found");
  res.status(200).json(new ApiResponse(200, tool, "Tool updated successfully"));
});

const deleteTool = asyncHandler(async (req, res) => {
  const tool = await Tool.findByIdAndDelete(req.params.id);
  if (!tool) throw new ApiError(404, "Tool not found");
  res.status(200).json(new ApiResponse(200, null, "Tool deleted successfully"));
});

module.exports = {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
};
