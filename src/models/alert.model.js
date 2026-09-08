const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: false },
    message: { type: String, default: "SYSTEM UPDATE IN PROGRESS" },
    badgeText: { type: String, default: "BETA" },
    subtext: {
      type: String,
      default: "Some portfolio modules are currently being synchronized with live database.",
    },
    footerText: { type: String, default: "v2.1 • node@online" },
    icon: { type: String, default: "AlertTriangle" },
    position: { type: String, default: "bottom-center" }, // bottom-center, top-center, bottom-right, top-right
    showCloseButton: { type: Boolean, default: true },

    // Style & Color Customizations
    primaryColor: { type: String, default: "#eab308" }, // yellow-500
    backgroundColor: { type: String, default: "#030712" }, // gray-950
    borderColor: { type: String, default: "rgba(234, 179, 8, 0.4)" },
    titleColor: { type: String, default: "#facc15" }, // yellow-400
    textColor: { type: String, default: "#9ca3af" }, // gray-400
    badgeBgColor: { type: String, default: "rgba(234, 179, 8, 0.2)" },
    badgeTextColor: { type: String, default: "#fde047" }, // yellow-300
    glowColor: { type: String, default: "#facc15" },

    // Typography
    fontFamily: { type: String, default: "font-mono" }, // font-mono, font-sans, font-serif
    titleFontSize: { type: String, default: "text-xs" }, // text-xs, text-sm, text-base
    bodyFontSize: { type: String, default: "text-xs" }, // text-xs, text-sm

    // Animation / Effects
    pulseGlow: { type: Boolean, default: true },
    backdropBlur: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
