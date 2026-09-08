const express = require("express");
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skill.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllSkills);

// Admin only routes
router.use(verifyJWT);

router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;
