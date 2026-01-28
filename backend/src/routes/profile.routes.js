const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware"); // 👈 NEW

const {
  getMyProfile,
  upsertMyProfile
} = require("../controllers/profile.controller");

/**
 * Candidate/Admin: View own profile
 */
router.get(
  "/me",
  authMiddleware,
  authorize("candidate", "HR"),
  getMyProfile
);

/**
 * Candidate: Update own profile
 */
router.put(
  "/me",
  authMiddleware,
  authorize("candidate"),
  upsertMyProfile
);

module.exports = router;
