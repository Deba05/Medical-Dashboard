
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  heartRate: Number,
  spo2: Number,
  weight: Number,
  systolicBP: Number,   // ✅ New
  diastolicBP: Number,  // ✅ New
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Data", dataSchema);


