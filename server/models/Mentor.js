const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const mentorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    expertise: {
      type: [String],
      default: [],
    },

    slots: {
      type: [slotSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "suspended", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mentor", mentorSchema);