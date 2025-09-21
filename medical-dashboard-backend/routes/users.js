
// const express = require('express');
// const router = express.Router();
// const { createUser, findUser } = require('../models/User');

// router.get('/signup', (req, res) => {
//   res.render('users/signup');
// });

// router.post('/signup', async (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.send("❌ Passwords do not match");
//   }

//   const existingUser = await findUser(username);
//   if (existingUser) {
//     return res.send("❌ Username already exists");
//   }

//   await createUser(username, password);
//   res.redirect('/login');
// });

// module.exports = router;
// routes/users.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor'); // Mongoose Doctor model

// Signup form
router.get('/signup', (req, res) => {
  res.render('users/signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Password check
    if (password !== confirmPassword) {
      return res.send("❌ Passwords do not match. <a href='/signup'>Try again</a>");
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ username });
    if (existingDoctor) {
      return res.send("❌ Username already exists. <a href='/signup'>Try again</a>");
    }

    // Create doctor (password is hashed in doctor.js pre-save hook)
    const newDoctor = new Doctor({ username, password });
    await newDoctor.save();

    // Redirect to login after signup
    res.redirect('/login');
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error during signup");
  }
});

module.exports = router;










