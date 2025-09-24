


// ✅ Ensure user is logged in
// function isAdmin(req, res, next) {
//   if (req.session.user && req.session.user.role === 'admin') {
//     return next();
//   }
//   return res.status(403).send("Access denied. Admins only.");
// }
// function isAuthenticated(req, res, next) {
//   if (req.session && req.session.user) {
//     return next();
//   }
//   return res.redirect('/login');
// }

// // ✅ Restrict to doctors only
// function isDoctor(req, res, next) {
//   if (req.session.user && req.session.user.role === 'doctor') {
//     return next();
//   }
//   return res.status(403).send("Access denied. Doctors only.");
// }

// // ✅ Restrict to patients only
// function isPatient(req, res, next) {
//   if (req.session.user && req.session.user.role === 'patient') {
//     return next();
//   }
//   return res.status(403).send("Access denied. Patients only.");
// }

// // ✅ Pass session data to EJS templates
// function setSessionToLocals(req, res, next) {
//   res.locals.user = req.session.user || null;
//   next();
// }

// module.exports = {
//   isAuthenticated,
//   isDoctor,
//   isAdmin,
//   isPatient,
//   setSessionToLocals
// };
// ✅ Ensure user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
}

// ✅ Restrict to doctors only
function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'doctor') {
    return next();
  }
  return res.status(403).send("Access denied. Doctors only.");
}

// ✅ Restrict to patients only
function isPatient(req, res, next) {
  if (req.session.user && req.session.user.role === 'patient') {
    return next();
  }
  return res.status(403).send("Access denied. Patients only.");
}

// ✅ Restrict to admins only
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).send("Access denied. Admins only.");
}

// ✅ Alias for isAuthenticated (if you want a separate name)
function isLoggedIn(req, res, next) {
  return isAuthenticated(req, res, next);
}

// ✅ Pass session data to EJS templates
function setSessionToLocals(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
}

module.exports = {
  isAuthenticated,
  isDoctor,
  isAdmin,
  isPatient,
  isLoggedIn,
  setSessionToLocals
};


