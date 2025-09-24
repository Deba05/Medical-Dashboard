
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  image: String,
  // link the patient to a doctor (null if not assigned)
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
  createdAt: { type: Date, default: Date.now },
  consentForResearch: { type: Boolean, default: false }
});

module.exports = mongoose.model('Patient', patientSchema);

