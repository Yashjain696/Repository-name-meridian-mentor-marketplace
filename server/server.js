const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Mentor = require("./models/Mentor");
const Mentee = require("./models/Mentee");
const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ==================== MongoDB Connection ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
  });

// ==================== Test Route ====================

app.get("/", (req, res) => {
  res.json({
    message: "Meridian Mentor Backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

// ==================== MENTOR APIs ====================

// Get all mentors
app.get("/api/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
});

// Add new mentor
app.post("/api/mentors", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    const savedMentor = await mentor.save();

    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create mentor",
      error: error.message,
    });
  }
});

// ==================== MENTEE APIs ====================

// Get all mentees
app.get("/api/mentees", async (req, res) => {
  try {
    const mentees = await Mentee.find();
    res.json(mentees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mentees",
      error: error.message,
    });
  }
});

// Add new mentee
app.post("/api/mentees", async (req, res) => {
  try {
    const mentee = new Mentee(req.body);
    const savedMentee = await mentee.save();

    res.status(201).json(savedMentee);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create mentee",
      error: error.message,
    });
  }
});

// ==================== BOOKING APIs ====================

// Get all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// Create booking
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// Update booking status
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
});

// Delete booking
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findOneAndDelete({
      id: req.params.id,
    });

    if (!deletedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete booking",
      error: error.message,
    });
  }
});