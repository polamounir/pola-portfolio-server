const express = require("express");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const { upload } = require("../config/cloudinary");

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin only routes
router.use(verifyJWT);

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createProject
);

router.patch(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProject
);

router.delete("/:id", deleteProject);

module.exports = router;
