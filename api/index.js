require("dotenv").config();
const connectDB = require("../src/config/db");
const app = require("../src/app");

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error in serverless handler:", err);
  }
  return app(req, res);
};
