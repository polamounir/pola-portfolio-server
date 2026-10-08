const Profile = require("../models/profile.model");
const Project = require("../models/project.model");
const Skill = require("../models/skill.model");
const Experience = require("../models/experience.model");
const NavigationLink = require("../models/navigationLink.model");
const Alert = require("../models/alert.model");
const Theme = require("../models/theme.model");
const Faq = require("../models/faq.model");
const Certification = require("../models/certification.model");
const Tool = require("../models/tool.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getCache, setCache, clearCache } = require("../utils/cache");

const INIT_CACHE_KEY = "init_data";
const INIT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getInitData = asyncHandler(async (req, res) => {
  // Check in-memory RAM cache first
  const cached = getCache(INIT_CACHE_KEY);
  if (cached) {
    return res.status(200).json(
      new ApiResponse(200, cached, "Portfolio initialization data fetched from cache")
    );
  }

  const [
    profile,
    projects,
    skills,
    experiences,
    navigationLinks,
    alert,
    theme,
    faqs,
    certifications,
    tools,
  ] = await Promise.all([
    Profile.findOne().lean(),
    Project.find().sort({ order: 1, createdAt: -1 }).lean(),
    Skill.find().sort({ order: 1 }).lean(),
    Experience.find().sort({ order: 1, startDate: -1 }).lean(),
    NavigationLink.find().sort({ order: 1 }).lean(),
    Alert.findOne().lean(),
    Theme.findOne().lean(),
    Faq.find().sort({ order: 1, createdAt: 1 }).lean(),
    Certification.find().sort({ order: 1, createdAt: 1 }).lean(),
    Tool.find().sort({ order: 1, createdAt: 1 }).lean(),
  ]);

  const payload = {
    profile: profile || {},
    projects: projects || [],
    skills: skills || [],
    experiences: experiences || [],
    navigationLinks: navigationLinks || [],
    alert: alert || null,
    theme: theme || null,
    faqs: faqs || [],
    certifications: certifications || [],
    tools: tools || [],
  };

  // Cache compiled response in RAM
  setCache(INIT_CACHE_KEY, payload, INIT_CACHE_TTL);

  res.status(200).json(
    new ApiResponse(
      200,
      payload,
      "Portfolio initialization data fetched successfully"
    )
  );
});

const invalidateInitCache = () => {
  clearCache(INIT_CACHE_KEY);
};

module.exports = {
  getInitData,
  invalidateInitCache,
};
