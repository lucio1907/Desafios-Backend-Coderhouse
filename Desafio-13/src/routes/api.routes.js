import express from "express";
import { getRandomNumber } from "../controllers/api.controller.js";

const apiRoute = express.Router();

apiRoute.get("/", getRandomNumber);

export default apiRoute;    