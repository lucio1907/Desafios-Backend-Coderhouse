import express from "express";
import compression from "compression";
import { getInfo, getRandomNumbers, routeNotSpecified } from "../controllers/routesControllers.controller.js";

const router = express.Router();

router.get("/info", getInfo);

router.get("/infoGzip", compression(), getInfo);

router.get("/api/randomNumbers", getRandomNumbers);

router.get("*", routeNotSpecified);

export default router;