const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  reportIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");

// Create Incident
router.post("/", authMiddleware, reportIncident);

// View All Incidents
router.get("/", authMiddleware, getIncidents);

// Update Incident
router.put("/:id", authMiddleware, updateIncident);

// Delete Incident
router.delete("/:id", authMiddleware, deleteIncident);

module.exports = router;
