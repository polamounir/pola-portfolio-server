const express = require("express");
const {
  getAllMessages,
  createMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/message.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

// Public route for contact form
router.post("/", createMessage);

// Admin only routes
router.use(verifyJWT);

router.get("/", getAllMessages);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteMessage);

module.exports = router;
