const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const visitorTracker = require("./middlewares/visitor.middleware");

const path = require("path");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "x-fingerprint"],
  })
);

// Smart HTTP Cache-Control & CORS policy
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin, Accept-Encoding");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  // Allow caching for public read requests (drastically reduces server load & latency)
  if (req.method === "GET" && !req.headers.authorization && !req.path.startsWith("/api/v1/auth")) {
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=600");
  } else {
    // Admin mutations & auth endpoints remain uncached
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  }

  next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/resumes", express.static(path.join(__dirname, "../public/resumes")));

// Global Visitor Tracking middleware
app.use(visitorTracker);

// Routes import
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const projectRouter = require("./routes/project.routes");
const navigationLinkRouter = require("./routes/navigationLink.routes");
const experienceRouter = require("./routes/experience.routes");
const skillRouter = require("./routes/skill.routes");
const visitorRouter = require("./routes/visitor.routes");
const messageRouter = require("./routes/message.routes");
const alertRouter = require("./routes/alert.routes");
const themeRouter = require("./routes/theme.routes");
const faqRouter = require("./routes/faq.routes");
const certificationRouter = require("./routes/certification.routes");
const toolRouter = require("./routes/tool.routes");
const initRouter = require("./routes/init.routes");

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pola Mounir Portfolio API Server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// Routes declaration
app.use("/api/v1/init", initRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/navigation-links", navigationLinkRouter);
app.use("/api/v1/experiences", experienceRouter);
app.use("/api/v1/skills", skillRouter);
app.use("/api/v1/visitors", visitorRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/alert", alertRouter);
app.use("/api/v1/theme", themeRouter);
app.use("/api/v1/faqs", faqRouter);
app.use("/api/v1/certifications", certificationRouter);
app.use("/api/v1/tools", toolRouter);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
