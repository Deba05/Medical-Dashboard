
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: Number,
  gender: String,
  image: String
});

module.exports = mongoose.model('Patient', patientSchema);
