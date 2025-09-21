// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // GET patient dashboard
// router.get('/:id/dashboard', async (req, res) => {
//   const patient = await User.findById(req.params.id);
//   if (!patient || patient.role !== 'patient') {
//     return res.status(404).send('Patient not found');
//   }

//   // Send vitals to EJS template
//   res.render('patientDashboard', { patient });
// });



// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// const User = require("../models/User");
// const Patient = require("../models/patient");
// const Data = require("../models/data");

// // ✅ GET patient dashboard
// router.get("/:id/dashboard", async (req, res) => {
//   try {
//     const patient = await User.findById(req.params.id);
//     if (!patient || patient.role !== "patient") {
//       return res.status(404).send("Patient not found");
//     }

//     const vitals = await Data.find({ patient: patient._id }).sort({ timestamp: 1 });

//     // Render EJS template with patient + vitals
//     res.render("patientDashboard", { patient, vitals });
//   } catch (err) {
//     console.error("Dashboard Error:", err.message);
//     res.status(500).send("Error loading dashboard");
//   }
// });

// // ✅ POST AI Insights
// //
// // routes/patient.js
// // ✅ GET patient dashboard
// router.get("/:id/dashboard", async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);  // <-- was User, change to Patient
//     if (!patient) {
//       return res.status(404).send("Patient not found");
//     }

//     const vitals = await Data.find({ patient: patient._id }).sort({ timestamp: 1 });

//     res.render("patientDashboard", { patient, vitals });
//   } catch (err) {
//     console.error("Dashboard Error:", err.message);
//     res.status(500).send("Error loading dashboard");
//   }
// });




// module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Patient = require("../models/patient");
const Data = require("../models/data");

// POST: AI Insights
// router.post("/:id/ai-insights", async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.params.id);
//     const vitals = await Data.find({ patientName: patient.name }).sort({ timestamp: 1 });

//     if (!patient || vitals.length === 0) {
//       return res.status(404).send("No patient data found");
//     }

//     const latest = vitals[vitals.length - 1];

//     // Forward to Python ML API
//     const response = await axios.post("http://127.0.0.1:5000/analyze", {
//       heartRate: latest.heartRate,
//       spo2: latest.spo2,
//       weight: latest.weight || 70, // default weight
//       timestamp: latest.timestamp
//     });

//     res.json({
//       patient: patient.name,
//       status: response.data.status,
//       insight: response.data.insight
//     });
//   } catch (err) {
//     console.error("AI Insights Error:", err.message);
//     res.status(500).send("Error fetching AI insights");
//   }
// });
router.post("/:id/ai-insights", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send("Patient not found");

    // ✅ Fetch latest vitals using ObjectId
    const latest = await Data.findOne({ patient: patient._id }).sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).send("No vitals found for this patient");
    }

    // Send to ML model
    const response = await axios.post("http://127.0.0.1:5000/analyze", {
      heartRate: latest.heartRate,
      spo2: latest.spo2,
      weight: latest.weight,
      timestamp: latest.timestamp,
    });

    res.json({
      patient: patient.name,
      status: response.data.status,
      insight: response.data.insight,
    });
  } catch (err) {
    console.error("AI Insights Error:", err.message);
    res.status(500).send("Error fetching AI insights");
  }
});


module.exports = router;


