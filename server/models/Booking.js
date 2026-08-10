const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    mentorId: {
      type: String,
      required: true,
    },

    menteeId: {
      type: String,
      required: true,
    },

    slotLabel: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },

    createdAtLabel: {
      type: String,
      default: "Just now",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);