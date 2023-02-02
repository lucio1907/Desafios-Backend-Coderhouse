const sessionChecker = (req, res, next) => {
  if (!req.session.passport) {
    return res.redirect("/user/register")
  }

  if (req.session.passport.user && req.cookies.user_sid) {
    return res.redirect("/user/dashboard");
  } else {
    console.log("hola");
    next();
  }
};

export default sessionChecker;
