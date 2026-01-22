const Profile = require("../models/profile.model");
const User = require("../models/user.model");

/* =========================
   GET ALL CANDIDATE PROFILES
   Recruiter / Admin
========================= */
const getAllCandidateProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("user", "name email role")
      .lean();

    // Optional: return only candidates
    const candidateProfiles = profiles.filter(
      profile => profile.user.role === "candidate"
    );

    res.status(200).json(candidateProfiles);
  } catch (error) {
    console.error("Get all profiles error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   GET SINGLE CANDIDATE PROFILE
   Recruiter / Admin
========================= */
const getCandidateProfileById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || user.role !== "candidate") {
      return res.status(404).json({
        message: "Candidate not found"
      });
    }

    const profile = await Profile.findOne({ user: userId })
      .populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Get candidate profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE PLACEMENT STATUS
   Recruiter / Admin
========================= */
const updatePlacementStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { placementStatus } = req.body;

    const allowedStatuses = ["training", "ready", "placed"];

    if (!allowedStatuses.includes(placementStatus)) {
      return res.status(400).json({
        message: "Invalid placement status"
      });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { placementStatus } },
      { new: true }
    ).populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.status(200).json({
      message: "Placement status updated successfully",
      profile
    });
  } catch (error) {
    console.error("Update placement status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCandidateProfiles,
  getCandidateProfileById,
  updatePlacementStatus
};
