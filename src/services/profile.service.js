const Profile = require("../models/profile.model");
const ApiError = require("../utils/ApiError");

const getProfile = async () => {
  let profile = await Profile.findOne();
  // If no profile exists, create an empty one
  if (!profile) {
    profile = await Profile.create({
      name: "Your Name",
      title: "Your Title",
    });
  }
  return profile;
};

const updateProfile = async (updateData, files) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile();
  }

  // Handle uploaded files from Cloudinary
  if (files) {
    if (files.avatarUrl && files.avatarUrl.length > 0) {
      profile.avatarUrl = files.avatarUrl[0].path;
    }
    if (files.resumeUrl && files.resumeUrl.length > 0) {
      profile.resumeUrl = files.resumeUrl[0].path;
    }
  }

  // Update text fields
  const updatableFields = [
    "name",
    "title",
    "shortBio",
    "detailedBio",
    "headline",
    "yearsOfExperience",
    "linesOfCode",
  ];
  updatableFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      profile[field] = updateData[field];
    }
  });

  if (updateData.aboutParagraphs !== undefined) {
    if (typeof updateData.aboutParagraphs === "string") {
      try {
        profile.aboutParagraphs = JSON.parse(updateData.aboutParagraphs);
      } catch {
        profile.aboutParagraphs = updateData.aboutParagraphs
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);
      }
    } else if (Array.isArray(updateData.aboutParagraphs)) {
      profile.aboutParagraphs = updateData.aboutParagraphs;
    }
  }

  if (updateData.bio) {
    profile.shortBio = updateData.bio;
    profile.detailedBio = updateData.bio;
  }

  if (!profile.contact) profile.contact = {};
  if (updateData.contact) {
    profile.contact = { ...profile.contact, ...updateData.contact };
  }
  if (updateData.email) profile.contact.email = updateData.email;
  if (updateData.location) profile.contact.location = updateData.location;
  if (updateData.phone) profile.contact.phone = updateData.phone;

  if (!profile.socialLinks) profile.socialLinks = {};
  if (updateData.socialLinks) {
    profile.socialLinks = { ...profile.socialLinks, ...updateData.socialLinks };
  }
  if (updateData.githubUrl || updateData.github) profile.socialLinks.github = updateData.githubUrl || updateData.github;
  if (updateData.linkedinUrl || updateData.linkedin) profile.socialLinks.linkedin = updateData.linkedinUrl || updateData.linkedin;
  if (updateData.twitter) profile.socialLinks.twitter = updateData.twitter;

  await profile.save();
  return profile;
};

module.exports = {
  getProfile,
  updateProfile,
};
