const express = require("express");
const {
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/extra.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllCertifications);

// Admin only
router.use(verifyJWT);
router.post("/", createCertification);
router.patch("/:id", updateCertification);
router.delete("/:id", deleteCertification);

module.exports = router;
