// backend/src/controllers/upload.controller.js
const { GridFSBucket, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Upload resume to MongoDB GridFS
async function uploadResumeToGridFS(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const file = req.file;
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return res.status(400).json({ message: "File too large" });
    }

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "resumes" });

    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata: { uploadedBy: req.user.id },
    });

    // Write buffer and finish
    uploadStream.end(file.buffer);

    uploadStream.on("error", (err) => {
      console.error(err);
      return res.status(500).json({ message: "Upload failed", error: err.message });
    });

    uploadStream.on("finish", async () => {
      try {
        const uploadedFileId = uploadStream.id;
        const uploadedFilename = uploadStream.filename;

        const Profile = require("../models/profile.model");
        const profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: {
              resumeUploaded: true,
              resumeFileId: uploadedFileId,
              resumeFilename: uploadedFilename,
              resumeMime: file.mimetype,
            },
            $setOnInsert: { user: req.user.id },
          },
          { new: true, upsert: true }
        );

        res.json({ profile, fileId: uploadedFileId.toString() });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update profile", error: err.message });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server upload failed", error: err.message || err.toString() });
  }
}

// Download resume from GridFS by file id
async function downloadResumeFromGridFS(req, res) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid file id");

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, { bucketName: "resumes" });

    const filesColl = db.collection("resumes.files");
    const fileDoc = await filesColl.findOne({ _id: new ObjectId(id) });
    if (!fileDoc) return res.status(404).send("File not found");

    res.setHeader("Content-Type", fileDoc.contentType || "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileDoc.filename}"`);

    const downloadStream = bucket.openDownloadStream(new ObjectId(id));
    downloadStream.pipe(res);
    downloadStream.on("error", (e) => {
      console.error(e);
      res.status(500).end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { uploadResumeToGridFS, downloadResumeFromGridFS };