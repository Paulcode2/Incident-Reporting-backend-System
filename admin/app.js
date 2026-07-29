require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const incidentRoutes = require("./routes/incidentRoute");

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Database Connection
connectDB();
// Routes
app.use("/api/auth", authRoutes);

app.use("/api/incidents", incidentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Incident Reporting API");
});

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
