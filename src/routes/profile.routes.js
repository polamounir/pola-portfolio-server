const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profile.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getProfile);

// Admin only route, can accept multiple files (avatarUrl and resumeUrl)
router.patch(
  "/",
  verifyJWT,
  upload.fields([
    { name: "avatarUrl", maxCount: 1 },
    { name: "resumeUrl", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
