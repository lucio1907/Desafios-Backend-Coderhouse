import express from "express";
import passport from "passport";
import { fileRegister, userRegister } from "../controllers/register.controller.js";

const userRegisterRoute = express.Router();

userRegisterRoute.get("/register", fileRegister)

userRegisterRoute.post("/registerUser", passport.authenticate("register", { failureRedirect: "/user/failedRegister" }), userRegister)

userRegisterRoute.get("/user/dashboard")

export default userRegisterRoute;