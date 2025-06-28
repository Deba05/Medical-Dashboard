
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  heartRate: {
    type: Number,
          
  },
  spo2: {
    type: Number,
            
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Data', dataSchema);
