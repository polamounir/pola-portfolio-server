require("dotenv").config();
const cloudinary = require("cloudinary").v2;

async function testCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log("=== Checking Cloudinary Configuration ===");
  console.log(`Cloud Name: ${cloudName ? cloudName : "MISSING"}`);
  console.log(`API Key:    ${apiKey ? apiKey.substring(0, 4) + "..." : "MISSING"}`);
  console.log(`API Secret: ${apiSecret ? "PRESENT (length: " + apiSecret.length + ")" : "MISSING"}`);

  if (!cloudName || cloudName === "your_cloud_name" || !apiKey || apiKey === "your_api_key" || !apiSecret) {
    console.log("\n⚠️ Cloudinary credentials are not set in .env yet.");
    console.log("Please update CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in portfoilo-server/.env");
    process.exit(0);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    console.log("\nConnecting to Cloudinary API...");
    const res = await cloudinary.api.ping();
    console.log("✅ Cloudinary connection SUCCESSFUL! Status:", res.status);
    process.exit(0);
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message || error);
    process.exit(1);
  }
}

testCloudinary();
