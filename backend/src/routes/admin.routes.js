const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const {
  getAllUsers,
  updateUserRole
} = require("../controllers/admin.controller");

/**
 * Admin: View all users
 */
router.get(
  "/users",
  authMiddleware,
  authorize("admin"),
  getAllUsers
);

/**
 * Admin: Update user role
 */
router.put(
  "/users/:userId/role",
  authMiddleware,
  authorize("admin"),
  updateUserRole
);

module.exports = router;
