const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const visitorTracker = require("./middlewares/visitor.middleware");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "x-fingerprint"],
  })
);

// Prevent caching of CORS headers and dynamic API responses across different client origins
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

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

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pola Mounir Portfolio API Server is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

// Routes declaration
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
