
const express = require('express');
const router = express.Router();
const { createUser, findUser } = require('../models/User');

router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send("❌ Passwords do not match");
  }

  const existingUser = await findUser(username);
  if (existingUser) {
    return res.send("❌ Username already exists");
  }

  await createUser(username, password);
  res.redirect('/login');
});

module.exports = router;









