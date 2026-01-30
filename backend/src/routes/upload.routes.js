// backend/src/routes/upload.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadResumeToGridFS, downloadResumeFromGridFS } = require("../controllers/upload.controller");

// Upload resume to GridFS
router.post("/resume", auth, authorize("candidate"), upload.single("resume"), uploadResumeToGridFS);
// Download resume by GridFS file id
router.get("/resume/:id", auth, authorize("candidate", "HR", "admin"), downloadResumeFromGridFS);

module.exports = router;