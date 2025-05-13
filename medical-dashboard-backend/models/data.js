const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    heartRate: Number,
    spo2: Number,


timestamp:{
    type: Date,
    default: Date.now
}
});
module.exports = mongoose.model('Data',dataSchema);