import express from "express";
import passport from "passport";
import {
  dashboard,
  failedLogin,
  getUser,
  htmlLogout,
  login,
  logout,
  userLogin,
} from "../controllers/login.controller.js";
import routeValidator from "../middleware/passportValidator.middleware.js";

const userLoginRoute = express.Router();

userLoginRoute.get("/login", userLogin);

userLoginRoute.post("/logUser", passport.authenticate("login", { failureRedirect: "/user/failedLogin" }), login);

userLoginRoute.get("/dashboard", routeValidator, dashboard);

userLoginRoute.get("/failedLogin", failedLogin);

userLoginRoute.get("/getUser", getUser);

userLoginRoute.get("/htmlLogout", htmlLogout);

userLoginRoute.get("/logout", logout);

export default userLoginRoute;
