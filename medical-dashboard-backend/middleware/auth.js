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
