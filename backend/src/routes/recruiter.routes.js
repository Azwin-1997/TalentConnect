const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const {
  getAllCandidateProfiles,
  getCandidateProfileById
} = require("../controllers/recruiter.controller");

/**
 * Recruiter/Admin: View all candidate profiles
 */
router.get(
  "/profiles",
  authMiddleware,
  authorize("recruiter", "admin"),
  getAllCandidateProfiles
);

/**
 * Recruiter/Admin: View single candidate profile
 */
router.get(
  "/profiles/:userId",
  authMiddleware,
  authorize("recruiter", "admin"),
  getCandidateProfileById
);

module.exports = router;
