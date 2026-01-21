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
    const { skills, experience, resumeUploaded, placementStatus } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        skills,
        experience,
        resumeUploaded,
        placementStatus
      },
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
