const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);

// 🔐 Protected logout route
router.post("/logout", authMiddleware, logout);

module.exports = router;
