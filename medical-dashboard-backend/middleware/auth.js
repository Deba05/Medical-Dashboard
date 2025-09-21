// middleware/auth.js

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user === 'admin') {
    return next();
  }
  res.redirect('/login');
}

// Middleware to expose session to EJS views
function setSessionToLocals(req, res, next) {
  res.locals.session = req.session;
  next();
}
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect('/login');
}

function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'doctor') {
    return next();
  }
  return res.status(403).send("Access denied. Doctors only.");
}

function isPatient(req, res, next) {
  if (req.session.user && req.session.user.role === 'patient') {
    return next();
  }
  return res.status(403).send("Access denied. Patients only.");
}

function setSessionToLocals(req, res, next) {
  res.locals.user = req.session.user;
  next();
}

module.exports = { isAuthenticated, isDoctor, isPatient, setSessionToLocals };




module.exports = {
  isAuthenticated,
  setSessionToLocals
};
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};
