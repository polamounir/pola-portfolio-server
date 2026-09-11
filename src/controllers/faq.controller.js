const Faq = require("../models/faq.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
  res.status(200).json(new ApiResponse(200, faqs, "FAQs fetched successfully"));
});

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer, order } = req.body;
  if (!question || !answer) {
    throw new ApiError(400, "Question and answer are required");
  }
  const faq = await Faq.create({
    question,
    answer,
    order: order ? Number(order) : 0,
  });
  res.status(201).json(new ApiResponse(201, faq, "FAQ created successfully"));
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!faq) throw new ApiError(404, "FAQ not found");
  res.status(200).json(new ApiResponse(200, faq, "FAQ updated successfully"));
});

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndDelete(req.params.id);
  if (!faq) throw new ApiError(404, "FAQ not found");
  res.status(200).json(new ApiResponse(200, null, "FAQ deleted successfully"));
});

module.exports = {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
};
