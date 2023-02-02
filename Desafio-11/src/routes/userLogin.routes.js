import express from "express";
import passport from "passport";
import sessionChecker from "../middleware/sessionChecker.middleware.js";
import { dashboard, failedLogin, getUser, login, userLogin } from "../controllers/login.controller.js";

const userLoginRoute = express.Router();

userLoginRoute.get("/login", userLogin);

userLoginRoute.post("/logUser", passport.authenticate("login", { failureRedirect: "/user/failedLogin" }), login)

userLoginRoute.get("/dashboard", dashboard);

userLoginRoute.get("/failedLogin", failedLogin);

userLoginRoute.get("/getUser", passport.authenticate("login"), getUser)

export default userLoginRoute;