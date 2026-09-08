const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure public/resumes directory exists for local reliable PDF storage
const publicResumesDir = path.join(__dirname, "../../public/resumes");
if (!fs.existsSync(publicResumesDir)) {
  fs.mkdirSync(publicResumesDir, { recursive: true });
}

// Configure Cloudinary credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Cloudinary storage for images (Avatar & Projects)
 * - automatically converted to WebP
 * - auto:eco quality for aggressive byte savings tailored for weak/mobile connections
 * - progressive scan flags
 * - max dimensions 1280px
 * - strip_profile
 */
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Handle Profile Avatar (Face-centered crop & converted to WebP)
    if (file.fieldname === "avatarUrl") {
      return {
        folder: "portfolio/avatars",
        resource_type: "image",
        format: "webp",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
          { quality: "auto:eco" },
          { flags: ["progressive", "strip_profile"] },
        ],
      };
    }

    // Default: Project Thumbnails and Gallery Images
    return {
      folder: "portfolio/projects",
      resource_type: "image",
      format: "webp",
      transformation: [
        { width: 1280, crop: "limit" },
        { quality: "auto:eco" },
        { flags: ["progressive", "strip_profile"] },
      ],
    };
  },
});

/**
 * Local disk storage for PDF resumes to bypass Cloudinary's default 401 PDF delivery restriction
 */
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicResumesDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `resume-${Date.now()}${ext}`);
  },
});

/**
 * Hybrid storage:
 * - PDF documents (resumeUrl) -> local disk in public/resumes for instant preview & download (200 OK)
 * - Images (avatarUrl, thumbnail, gallery) -> Cloudinary optimized WebP
 */
const hybridStorage = {
  _handleFile: function (req, file, cb) {
    const isPdf =
      file.fieldname === "resumeUrl" ||
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      diskStorage._handleFile(req, file, (err, info) => {
        if (err) return cb(err);
        const protocol = req.protocol || "http";
        const host = req.get("host") || "localhost:5000";
        info.path = `${protocol}://${host}/resumes/${info.filename}`;
        cb(null, info);
      });
    } else {
      cloudinaryStorage._handleFile(req, file, cb);
    }
  },
  _removeFile: function (req, file, cb) {
    if (file.fieldname === "resumeUrl") {
      diskStorage._removeFile(req, file, cb);
    } else {
      cloudinaryStorage._removeFile(req, file, cb);
    }
  },
};

// Multer upload middleware
const upload = multer({
  storage: hybridStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];

    if (
      allowedMimes.includes(file.mimetype) ||
      file.originalname.match(/\.(jpg|jpeg|png|webp|svg|pdf)$/i)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format! Please upload an image or PDF."));
    }
  },
});

module.exports = {
  cloudinary,
  upload,
};
