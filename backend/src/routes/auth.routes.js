const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshAccessToken
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/user.model");

/* =========================
   AUTH ROUTES
========================= */

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// 🔐 Get current authenticated user (IMPORTANT)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("name email role")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", authMiddleware, logout);

// Refresh access token
router.post("/refresh", refreshAccessToken);

module.exports = router;
