const accessControl = {};

accessControl.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Access Denied: Try logging in.');
  }
}

accessControl.isAccountOwnerOrAdmin = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Access Forbidden.');
  }
}


module.exports = accessControl;
