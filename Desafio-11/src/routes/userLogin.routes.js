import express from "express";
import { userLogin } from "../controllers/login.controller.js";

const userLoginRoute = express.Router();

userLoginRoute.get("/login", userLogin);

export default userLoginRoute;