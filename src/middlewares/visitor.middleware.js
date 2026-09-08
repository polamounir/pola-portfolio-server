const Visitor = require("../models/visitor.model");
const asyncHandler = require("../utils/asyncHandler");

const visitorTracker = asyncHandler(async (req, res, next) => {
  // Skip tracking for Admin requests
  if (req.headers.authorization) {
    return next();
  }

  // Get IP address from request
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "unknown";
  
  // Fingerprint could be sent from frontend in headers, or we can use a basic combination for now
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

  // Attach visitor id to request in case downstream needs it
  req.visitorId = visitor._id;

  next();
});

module.exports = visitorTracker;
