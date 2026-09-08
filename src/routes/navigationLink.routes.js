const express = require("express");
const {
  getAllNavigationLinks,
  createNavigationLink,
  updateNavigationLink,
  deleteNavigationLink,
} = require("../controllers/navigationLink.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllNavigationLinks);

// Admin only routes
router.use(verifyJWT);

router.post("/", createNavigationLink);
router.patch("/:id", updateNavigationLink);
router.delete("/:id", deleteNavigationLink);

module.exports = router;
