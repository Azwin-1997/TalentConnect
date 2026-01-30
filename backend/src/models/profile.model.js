const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    skills: {
      type: [String],
      default: []
    },

    experience: {
      type: String,
      default: ""
    },
  resumeFileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resumes.files",
    default: null
  },

  resumeFilename: {
    type: String,
    default: ""
  },

  resumeMime: {
    type: String,
    default: ""
  },

  resumeUploaded: {
    type: Boolean,
    default: false
  },

  placementStatus: {
    type: String,
    enum: ["training", "ready", "placed"],
    default: "training"
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
