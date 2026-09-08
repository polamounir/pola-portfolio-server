const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    ipAddress: {
      type: String,
      required: true,
    },
    fingerprint: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    hitCount: {
      type: Number,
      default: 1,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
