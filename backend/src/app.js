require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "backend" });
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// 404 handler (KEEP AT END)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

module.exports = app;
