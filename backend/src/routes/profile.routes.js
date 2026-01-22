const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  getMyProfile,
  upsertMyProfile
} = require("../controllers/profile.controller");

router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, upsertMyProfile);

module.exports = router;
