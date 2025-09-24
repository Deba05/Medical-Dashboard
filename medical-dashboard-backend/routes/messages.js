// routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// Get messages between logged-in user and another user
router.get("/:id", async (req, res) => {
  const user = req.session.user;
  const otherId = req.params.id;

  if (!user) return res.status(401).send("Not logged in");

  const messages = await Message.find({
    $or: [
      { sender: user.id, receiver: otherId },
      { sender: otherId, receiver: user.id }
    ]
  })
    .populate("sender", "name")
    .populate("receiver", "name")
    .sort({ timestamp: -1 });

  res.render("messages", {
    messages,
    user,
    receiverId: otherId
  });
});

// Default route
router.get("/", (req, res) => {
  res.status(404).send("Please select a patient or doctor to message.");
});

// Send a message
router.post("/send", async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    // Determine sender and receiver roles using DB lookup
    let senderRole = await Doctor.exists({ _id: sender }) ? "Doctor" : "Patient";
    let receiverRole = await Doctor.exists({ _id: receiver }) ? "Doctor" : "Patient";

    const message = new Message({
      sender,
      receiver,
      senderRole,
      receiverRole,
      text,
      timestamp: new Date()
    });
    await message.save();
    res.redirect(`/messages/${receiver}`);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send("Error sending message");
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).send("Message not found");

    // Only sender can delete
    if (String(msg.sender) !== req.session.user.id) {
      return res.status(403).send("Not authorized to delete this message");
    }

    // Redirect back to the conversation
    const otherId = String(msg.sender) === req.session.user.id
      ? String(msg.receiver)
      : String(msg.sender);

    await Message.findByIdAndDelete(req.params.id);
    res.redirect(`/messages/${otherId}`);
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).send("Error deleting message");
  }
});

module.exports = router; // ✅ must export the router

