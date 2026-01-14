const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { getCurrentUser } = require("../controllers/user.controller");

// Protected route
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
