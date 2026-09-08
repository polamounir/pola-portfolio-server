const Message = require("../models/message.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

const createMessage = asyncHandler(async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json(new ApiResponse(201, message, "Message sent successfully"));
});

const markAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { status: "read" },
    { returnDocument: "after" }
  );
  if (!message) throw new ApiError(404, "Message not found");
  res.status(200).json(new ApiResponse(200, message, "Message marked as read"));
});

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, "Message not found");
  res.status(200).json(new ApiResponse(200, null, "Message deleted successfully"));
});

module.exports = {
  getAllMessages,
  createMessage,
  markAsRead,
  deleteMessage,
};
