const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
      },
    ],
    links: {
      liveDemo: { type: String },
      github: { type: String },
    },
    images: {
      thumbnail: { type: String }, // Cloudinary URL
      gallery: [{ type: String }],
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Production",
    },
    lines: {
      type: String,
      default: "",
    },
    iconEmoji: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      trim: true,
      index: true,
    },
    fullDescription: {
      type: String,
      default: "",
    },
    datePublished: {
      type: String,
      default: "",
    },
    dateModified: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
