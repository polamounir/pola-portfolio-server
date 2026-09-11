const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    shortBio: { type: String },
    detailedBio: { type: String },
    headline: { type: String },
    yearsOfExperience: { type: String, default: "1+" },
    linesOfCode: { type: String, default: "40K+" },
    aboutParagraphs: [{ type: String }],
    avatarUrl: { type: String },
    resumeUrl: { type: String },
    contact: {
      email: { type: String },
      phone: { type: String },
      location: { type: String },
    },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      other: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
