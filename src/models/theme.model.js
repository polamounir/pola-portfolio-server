const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    presetName: { type: String, default: "Matrix Hacker" },
    primaryColor: { type: String, default: "#4ade80" }, // Green 400
    primaryDarkColor: { type: String, default: "#22c55e" }, // Green 500
    secondaryColor: { type: String, default: "#22d3ee" }, // Cyan 400
    secondaryDarkColor: { type: String, default: "#06b6d4" }, // Cyan 500
    backgroundColor: { type: String, default: "#030712" }, // Gray 950
    cardBackgroundColor: { type: String, default: "#111827" }, // Gray 900
    cardSubColor: { type: String, default: "#1f2937" }, // Gray 800
    glowColor: { type: String, default: "#22c55e" },
    fontFamily: {
      type: String,
      default: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    fontType: { type: String, default: "mono" }, // mono, sans, serif
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", themeSchema);
