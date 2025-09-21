
// const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//   patientName: {
//     type: String,
//     required: true
//   },
//   heartRate: {
//     type: Number,
          
//   },
//   spo2: {
//     type: Number,
            
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   },
//   ecg: { 
//     type: [Number], required: false 
//   }
// });

// module.exports = mongoose.model('Data', dataSchema);
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }, // 🔑 ObjectId ref
  heartRate: Number,
  spo2: Number,
  weight: Number,
  timestamp: { type: Date, default: Date.now },
  ecg: { type: [Number], required: false }
});

module.exports = mongoose.model("Data", dataSchema);

