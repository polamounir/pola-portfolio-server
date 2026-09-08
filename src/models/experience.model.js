const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Experience", "Education"],
      required: true,
    },
    title: {
      type: String, // Job title or Degree
      required: true,
    },
    organization: {
      type: String, // Company name or Institution
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
