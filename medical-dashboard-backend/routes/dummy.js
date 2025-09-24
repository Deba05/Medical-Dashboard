


// routes/dummy.js
const express = require("express");
const router = express.Router();
const Data = require("../models/data");
const Patient = require("../models/patient");

// 🎲 API to generate dummy data for a specific patient
router.post("/dummy/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).send("Patient not found");

    // 🎲 Random vitals generator with abnormal chances
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let heartRate, spo2, weight, systolicBP, diastolicBP;
    const scenario = Math.random();

    if (scenario < 0.15) {
      // 🔴 Critical
      heartRate = getRandomInt(160, 190);
      spo2 = getRandomInt(80, 88);
      weight = getRandomInt(50, 55);
      systolicBP = getRandomInt(180, 200);
      diastolicBP = getRandomInt(110, 120);
    } else if (scenario < 0.35) {
      // 🟠 Warning
      heartRate = getRandomInt(110, 130);
      spo2 = getRandomInt(90, 93);
      weight = getRandomInt(85, 95);
      systolicBP = getRandomInt(140, 160);
      diastolicBP = getRandomInt(90, 100);
    } else {
      // 🟢 Stable
      heartRate = getRandomInt(65, 100);
      spo2 = getRandomInt(95, 99);
      weight = getRandomInt(60, 80);
      systolicBP = getRandomInt(110, 120);
      diastolicBP = getRandomInt(70, 80);
    }

    const newData = new Data({
      patient: patientId,
      patientName: patient.name,
      heartRate,
      spo2,
      weight,
      systolicBP,
      diastolicBP,
      timestamp: new Date()
    });

    await newData.save();

    res.json({
      message: "✅ Dummy data added successfully",
      data: newData
    });
  } catch (err) {
    console.error("❌ Dummy data error:", err);
    res.status(500).send("Error adding dummy data");
  }
});

module.exports = router;
