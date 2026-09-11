const express = require("express");
const {
  getAllTools,
  createTool,
  updateTool,
  deleteTool,
} = require("../controllers/extra.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllTools);

// Admin only
router.use(verifyJWT);
router.post("/", createTool);
router.patch("/:id", updateTool);
router.delete("/:id", deleteTool);

module.exports = router;
