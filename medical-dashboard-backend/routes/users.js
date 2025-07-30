// const express = require('express');
// const router = express.Router();
// const { addUser, findUser } = require('../utils/userStore');

// router.get('/signup', (req, res) => {
//   res.render('users/signup');  // make sure views/users/signup.ejs exists
// });

// router.post('/signup', (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.send(" Passwords do not match");
//   }

//   if (findUser(username)) {
//     return res.send(" Username already taken");
//   }

//   addUser(username, password);
//   req.session.user = { username };
//   res.redirect('/home');
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { findUser } = require('../utils/userStore');

// router.get('/login', (req, res) => {
//   res.render('users/login');  // make sure views/users/login.ejs exists
// });

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = findUser(username);

//   if (!user || user.password !== password) {
//     return res.send("❌ Invalid credentials");
//   }

//   req.session.user = { username };
//   res.redirect('/home');
// });

// module.exports = router;

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









