import express from "express";
import { showInfo, showInfoHtml } from "../controllers/info.controller.js";
import routeValidator from "../middleware/passportValidator.middleware.js";

const infoRoute = express.Router();

infoRoute.get("/info", routeValidator, showInfoHtml);

infoRoute.get("/getInfo", showInfo);

export default infoRoute;
