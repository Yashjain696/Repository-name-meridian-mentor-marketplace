const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Mentor = require("./models/Mentor");
const Mentee = require("./models/Mentee");
const Booking = require("./models/Booking");

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: [
      "https://repository-name-meridian-mentor-mar.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Meridian Mentor Backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  });
});

// =====================================================
// MENTOR APIs
// =====================================================

// GET all mentors
app.get("/api/mentors", async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);

    res.status(500).json({
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
});

// POST new mentor
app.post("/api/mentors", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    const savedMentor = await mentor.save();

    res.status(201).json(savedMentor);
  } catch (error) {
    console.error("Error creating mentor:", error);

    res.status(400).json({
      message: "Failed to create mentor",
      error: error.message,
    });
  }
});

// =====================================================
// MENTEE APIs
// =====================================================

// GET all mentees
app.get("/api/mentees", async (req, res) => {
  try {
    const mentees = await Mentee.find();
    res.json(mentees);
  } catch (error) {
    console.error("Error fetching mentees:", error);

    res.status(500).json({
      message: "Failed to fetch mentees",
      error: error.message,
    });
  }
});

// POST new mentee
app.post("/api/mentees", async (req, res) => {
  try {
    const mentee = new Mentee(req.body);
    const savedMentee = await mentee.save();

    res.status(201).json(savedMentee);
  } catch (error) {
    console.error("Error creating mentee:", error);

    res.status(400).json({
      message: "Failed to create mentee",
      error: error.message,
    });
  }
});

// =====================================================
// BOOKING APIs
// =====================================================

// GET all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// POST create booking
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);

    res.status(400).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// PUT update booking
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);

    res.status(400).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
});

// DELETE booking
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
    console.error("Error deleting booking:", error);

    res.status(500).json({
      message: "Failed to delete booking",
      error: error.message,
    });
  }
});

// =====================================================
// BACKWARD COMPATIBILITY ROUTES
// =====================================================
// Agar frontend abhi /mentors, /mentees, /bookings call kar raha
// hai to ye routes bhi kaam karenge.

app.get("/mentors", async (req, res) => {
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

app.get("/mentees", async (req, res) => {
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

app.get("/bookings", async (req, res) => {
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

// =====================================================
// MONGODB CONNECTION
// =====================================================

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not defined in environment variables"
      );
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();