const User = require("../models/user.model");

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getCurrentUser
};
