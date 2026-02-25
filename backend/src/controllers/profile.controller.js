const Profile = require("../models/profile.model");

/* =========================
   GET MY PROFILE
========================= */
const getMyProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user:", req.user?.id);
    const profile = await Profile.findOne({ user: req.user.id });
    console.log("Profile found:", profile ? "Yes" : "No");

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
      name,
      title,
      location,
      phone,
      bio,
      skills,
      experience,
      workExperience,
      education,
      portfolioLinks,
      placementStatus,
      resumeFileId,
      resumeFilename,
      resumeMime,
    } = req.body;

    // Normalize payload and build update object
    const update = {};
    if (typeof name !== "undefined") update.name = name;
    if (typeof title !== "undefined") update.title = title;
    if (typeof location !== "undefined") update.location = location;
    if (typeof phone !== "undefined") update.phone = phone;
    if (typeof bio !== "undefined") update.bio = bio;

    if (typeof skills !== "undefined") {
      update.skills = Array.isArray(skills)
        ? skills.map((s) => String(s).trim()).filter(Boolean)
        : String(skills).split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (typeof experience !== "undefined") update.experience = experience;

    if (typeof workExperience !== "undefined" && Array.isArray(workExperience)) {
      update.workExperience = workExperience.map((we) => ({
        title: we.title || "",
        company: we.company || "",
        location: we.location || "",
        startDate: we.startDate || "",
        endDate: we.endDate || "",
        description: we.description || "",
      }));
    }

    if (typeof education !== "undefined" && Array.isArray(education)) {
      update.education = education.map((ed) => ({
        degree: ed.degree || "",
        institution: ed.institution || "",
        description: ed.description || "",
      }));
    }

    if (typeof portfolioLinks !== "undefined") {
      update.portfolioLinks = Array.isArray(portfolioLinks)
        ? portfolioLinks.map((p) => String(p).trim()).filter(Boolean)
        : [String(portfolioLinks).trim()].filter(Boolean);
    }

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
