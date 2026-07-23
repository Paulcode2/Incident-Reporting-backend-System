const Incident = require("../models/Incident");

// Create
const reportIncident = async (req, res) => {
  const incident = await Incident.create({
    title: req.body.title,

    description: req.body.description,

    reportedBy: req.user.id,
  });

  res.status(201).json(incident);
};

// Get All
const getIncidents = async (req, res) => {
  const incidents = await Incident.find()

    .populate("reportedBy", "username email");

  res.json(incidents);
};

// Update
const updateIncident = async (req, res) => {
  const incident = await Incident.findById(req.params.id);

  if (!incident) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  incident.title = req.body.title || incident.title;

  incident.description = req.body.description || incident.description;

  await incident.save();

  res.json(incident);
};

// Delete
const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findOne({
      _id: req.params.id,
      reportedBy: req.user.id,
    });

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found.",
      });
    }

    await Incident.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Incident deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  reportIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
};
