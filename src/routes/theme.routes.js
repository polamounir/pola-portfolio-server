const express = require("express");
const { getTheme, updateTheme } = require("../controllers/theme.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getTheme);
router.patch("/", verifyJWT, updateTheme);
router.put("/", verifyJWT, updateTheme);

module.exports = router;
