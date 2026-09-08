const express = require("express");
const { getAllVisitors, updateVisitorName } = require("../controllers/visitor.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

// Public route for frontend to update name
router.patch("/:id", updateVisitorName);

// Admin only route
router.get("/", verifyJWT, getAllVisitors);

module.exports = router;
