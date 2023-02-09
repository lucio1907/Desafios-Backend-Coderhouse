const sessionChecker = (req, res, next) => {
  if (req.session.passport.user && req.cookies.user_sid) {
    return res.redirect("/user/dashboard");
  } else {
    next();
  }
};

export default sessionChecker;
