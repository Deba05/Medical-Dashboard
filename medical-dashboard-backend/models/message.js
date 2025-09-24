const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'senderRole' // Reference Doctor or Patient dynamically
  },
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    refPath: 'receiverRole' // Reference Doctor or Patient dynamically
  },
  senderRole: { type: String, enum: ["Doctor", "Patient"], required: true },
  receiverRole: { type: String, enum: ["Doctor", "Patient"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);

