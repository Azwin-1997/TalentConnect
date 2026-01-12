const express = require("express");
const cors = require("cors");

const app = express();

// --------------------
// Global Middlewares
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Routes
// --------------------
const authRoutes = require("./routes/auth.routes");

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "backend" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// --------------------
// 404 Handler
// --------------------
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

module.exports = app;
