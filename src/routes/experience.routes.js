const express = require("express");
const {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllExperiences);

// Admin only routes
router.use(verifyJWT);

router.post("/", createExperience);
router.patch("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;
