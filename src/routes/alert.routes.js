const express = require("express");
const { getAlert, updateAlert } = require("../controllers/alert.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAlert);
router.patch("/", verifyJWT, updateAlert);
router.put("/", verifyJWT, updateAlert);

module.exports = router;
