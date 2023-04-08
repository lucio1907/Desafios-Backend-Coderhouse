import info from "../utils/info.js";
import { logConfiguration, randomNumber } from "../utils/utils.js";
import RandomNumberDaoArray from "../dao/RandomNumbersDaoArray.js";
import NumberService from "../services/numberService.js";
import dotenv from "dotenv";

dotenv.config();

const logger = logConfiguration.getLogger(process.env.NODE_ENV);
const numberSevice = new NumberService();

const getInfo = (req, res) => {
  logger.info(`Route: ${req.url}, Method: ${req.method}`);
  res.json(info);
};

const getRandomNumbers = async (req, res) => {
    const query = req.query;
    logger.info(`Route: ${req.url}, Method: ${req.method}`);
    await numberSevice.generateRandomNumber(query);
    const result = await numberSevice.getAllNumbers()
    res.status(result.status).json(result.message);
}

const routeNotSpecified = (req, res) => {
    logger.warn(`Route: ${req.url}, Method: ${req.method}, ErrorMessage: nonexistent route`);
    res.status(404).json({ message: "Route not found" });
}

export { getInfo, getRandomNumbers, routeNotSpecified };
