const routeValidator = (req, res, next) => {
  if (req.session.passport === undefined) {
    res.redirect("/user/login");
  } else {
    next();
  }
};

export default routeValidator;