const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  reportIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");
const upload = require("../middleware/uploadMiddleware");

// Create Incident
router.post("/", authMiddleware, upload.single("image"), reportIncident);

// View All Incidents
router.get("/", authMiddleware, getIncidents);

// Update Incident
router.put("/:id", authMiddleware, upload.single("image"), updateIncident);

// Delete Incident
router.delete("/:id", authMiddleware, deleteIncident);

module.exports = router;
