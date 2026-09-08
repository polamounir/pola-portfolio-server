const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const profileService = require("../services/profile.service");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile();
  res.status(200).json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  let updateData = req.body;
  
  // Parse nested objects if they come as stringified JSON from FormData
  if (typeof updateData.contact === 'string') {
    updateData.contact = JSON.parse(updateData.contact);
  }
  if (typeof updateData.socialLinks === 'string') {
    updateData.socialLinks = JSON.parse(updateData.socialLinks);
  }

  const profile = await profileService.updateProfile(updateData, req.files);
  res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
});

module.exports = {
  getProfile,
  updateProfile,
};
