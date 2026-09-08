const Visitor = require("../models/visitor.model");

const visitorTracker = async (req, res, next) => {
  // Skip tracking for Admin requests or preflight OPTIONS
  if (req.method === "OPTIONS" || req.headers.authorization) {
    return next();
  }

  try {
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const userAgent = req.headers["user-agent"] || "unknown";
    const fingerprint = req.headers["x-fingerprint"] || `${ipAddress}-${userAgent}`;

    let visitor = await Visitor.findOne({ fingerprint });

    if (visitor) {
      visitor.hitCount += 1;
      visitor.lastVisit = Date.now();
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        ipAddress,
        fingerprint,
        userAgent,
      });
    }

    if (visitor) {
      req.visitorId = visitor._id;
    }
  } catch (err) {
    // Non-blocking: log and continue to avoid API failure if DB is unavailable
    console.warn("Visitor tracking non-fatal error:", err.message);
  }

  next();
};

module.exports = visitorTracker;
