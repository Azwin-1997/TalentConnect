const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshAccessToken // ✅ IMPORT IT
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);

// 🔐 Protected logout route
router.post("/logout", authMiddleware, logout);

// 🔄 Refresh access token
router.post("/refresh", refreshAccessToken);

module.exports = router;
