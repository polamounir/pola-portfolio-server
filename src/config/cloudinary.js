const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure public/resumes directory exists for local disk fallback (safe in read-only environments)
const publicResumesDir = path.join(__dirname, "../../public/resumes");
try {
  if (!fs.existsSync(publicResumesDir)) {
    fs.mkdirSync(publicResumesDir, { recursive: true });
  }
} catch (err) {
  // Gracefully ignored in read-only serverless environments like Vercel
}

// Configure Cloudinary credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Cloudinary storage for:
 * - Avatar: Face-crop WebP
 * - Resume PDF: Stored in portfolio/resumes
 * - Projects: WebP optimized
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

    // Handle PDF Resumes
    const isPdf =
      file.fieldname === "resumeUrl" ||
      file.mimetype === "application/pdf" ||
      (file.originalname && file.originalname.toLowerCase().endsWith(".pdf"));

    if (isPdf) {
      return {
        folder: "portfolio/resumes",
        resource_type: "image",
        format: "pdf",
        public_id: `resume-${Date.now()}`,
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
 * Local disk fallback storage for PDF resumes when offline or if Cloudinary is unavailable
 */
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(publicResumesDir)) {
        fs.mkdirSync(publicResumesDir, { recursive: true });
      }
      cb(null, publicResumesDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `resume-${Date.now()}${ext}`);
  },
});

/**
 * Resilient Hybrid Storage:
 * - Resumes & Avatars are uploaded to Cloudinary
 * - For PDFs, generates an authorized Cloudinary signed download URL which returns HTTP 200 OK
 *   (bypassing Cloudinary's default 401 unauthenticated delivery restriction)
 * - If Cloudinary is missing or fails, gracefully falls back to local disk storage
 */
const hybridStorage = {
  _handleFile: function (req, file, cb) {
    const isPdf =
      file.fieldname === "resumeUrl" ||
      file.mimetype === "application/pdf" ||
      (file.originalname && file.originalname.toLowerCase().endsWith(".pdf"));

    const hasCloudinary =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (!hasCloudinary) {
      if (isPdf) {
        return diskStorage._handleFile(req, file, (err, info) => {
          if (err) return cb(err);
          const protocol = req.protocol || "http";
          const host = req.get("host") || "localhost:5000";
          info.path = `${protocol}://${host}/resumes/${info.filename}`;
          cb(null, info);
        });
      }
      return cb(new Error("Cloudinary credentials are not configured"));
    }

    // Upload via Cloudinary
    cloudinaryStorage._handleFile(req, file, (err, info) => {
      if (err) {
        // Fallback to disk if Cloudinary upload fails on a PDF
        if (isPdf) {
          return diskStorage._handleFile(req, file, (diskErr, diskInfo) => {
            if (diskErr) return cb(err);
            const protocol = req.protocol || "http";
            const host = req.get("host") || "localhost:5000";
            diskInfo.path = `${protocol}://${host}/resumes/${diskInfo.filename}`;
            cb(null, diskInfo);
          });
        }
        return cb(err);
      }

      // If PDF, generate authorized Cloudinary delivery URL with 200 OK
      if (isPdf && info) {
        const publicId = info.filename || info.public_id;
        if (publicId) {
          try {
            info.path = cloudinary.utils.private_download_url(publicId, "pdf", {
              resource_type: "image",
              type: "upload",
            });
          } catch (signErr) {
            console.error("Error signing Cloudinary PDF download URL:", signErr);
          }
        }
      }

      cb(null, info);
    });
  },
  _removeFile: function (req, file, cb) {
    cloudinaryStorage._removeFile(req, file, (err) => {
      if (file.fieldname === "resumeUrl") {
        diskStorage._removeFile(req, file, () => cb(err));
      } else {
        cb(err);
      }
    });
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
