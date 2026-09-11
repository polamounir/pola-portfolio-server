const express = require("express");
const {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faq.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllFaqs);

// Admin only routes
router.use(verifyJWT);

router.post("/", createFaq);
router.patch("/:id", updateFaq);
router.delete("/:id", deleteFaq);

module.exports = router;
