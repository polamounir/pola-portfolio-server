const express = require("express");
const { getInitData } = require("../controllers/init.controller");

const router = express.Router();

router.get("/", getInitData);

module.exports = router;
