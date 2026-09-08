require("dotenv").config();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Project = require("./src/models/project.model");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const projectsImageMap = [
  {
    title: "Fast-Box",
    imageFileName: "p11.png",
  },
  {
    title: "Electroo E-commerce",
    imageFileName: "p21.png",
  },
  {
    title: "Medical Prediction System",
    imageFileName: "p31.png",
  },
  {
    title: "SEF Gold",
    imageFileName: "p41.png",
  },
  {
    title: "Weather Application",
    imageFileName: "p51.png",
  },
];

async function uploadAndSync() {
  const imagesDir = path.resolve(__dirname, "../pola-portfolio-main/src/assets/projects");
  console.log("Images directory:", imagesDir);

  if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found:", imagesDir);
    process.exit(1);
  }

  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI;
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(mongoUri, { dbName: process.env.DB_NAME || "portfolio" });
  console.log("Connected to MongoDB Atlas.");

  const uploadedUrls = {};

  for (const item of projectsImageMap) {
    const filePath = path.join(imagesDir, item.imageFileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${item.imageFileName} for "${item.title}" to Cloudinary...`);
    try {
      const uploadRes = await cloudinary.uploader.upload(filePath, {
        folder: "portfolio/projects",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        resource_type: "image",
      });

      console.log(`Uploaded ${item.title}: ${uploadRes.secure_url}`);
      uploadedUrls[item.title] = uploadRes.secure_url;

      // Update in MongoDB
      const updated = await Project.findOneAndUpdate(
        { title: item.title },
        {
          $set: {
            "images.thumbnail": uploadRes.secure_url,
          },
        },
        { new: true }
      );

      if (updated) {
        console.log(`Updated MongoDB project "${item.title}" successfully.`);
      } else {
        console.warn(`Project "${item.title}" not found in MongoDB.`);
      }
    } catch (err) {
      console.error(`Error uploading ${item.imageFileName}:`, err);
    }
  }

  console.log("\n--- Cloudinary Project Image URLs ---");
  console.log(JSON.stringify(uploadedUrls, null, 2));

  await mongoose.disconnect();
  console.log("Completed!");
}

uploadAndSync().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
