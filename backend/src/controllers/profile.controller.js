const Profile = require("../models/profile.model");

/* =========================
   GET MY PROFILE
========================= */
const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CREATE / UPDATE MY PROFILE
========================= */
const upsertMyProfile = async (req, res) => {
  try {
    const {
      skills,
      experience,
      resumeUploaded,
      placementStatus,
      resumeFileId,
      resumeFilename,
      resumeMime,
    } = req.body;

    // Normalize payload and build update object
    const update = {};
    if (typeof skills !== "undefined") update.skills = skills;
    if (typeof experience !== "undefined") update.experience = experience;
    if (typeof resumeUploaded !== "undefined") update.resumeUploaded = resumeUploaded;
    if (typeof placementStatus !== "undefined") update.placementStatus = placementStatus;
    if (typeof resumeFileId !== "undefined") update.resumeFileId = resumeFileId;
    if (typeof resumeFilename !== "undefined") update.resumeFilename = resumeFilename;
    if (typeof resumeMime !== "undefined") update.resumeMime = resumeMime;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: update, $setOnInsert: { user: req.user.id } },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyProfile,
  upsertMyProfile
};
