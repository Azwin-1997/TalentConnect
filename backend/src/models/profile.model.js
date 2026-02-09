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
    // Basic profile info (optional; some comes from User)
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },

    // Work experience entries
    workExperience: {
      type: [
        {
          title: String,
          company: String,
          location: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: []
    },

    // Education entries
    education: {
      type: [
        {
          degree: String,
          institution: String,
          description: String,
        },
      ],
      default: []
    },

    // Portfolio links
    portfolioLinks: {
      type: [String],
      default: []
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
