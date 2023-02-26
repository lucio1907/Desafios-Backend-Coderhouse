import info from "../utils/info.js";
import { logConfiguration, randomNumber } from "../utils/utils.js";
import dotenv from "dotenv";

dotenv.config();

const logger = logConfiguration.getLogger(process.env.NODE_ENV);

const getInfo = (req, res) => {
  logger.info(`Route: ${req.url}, Method: ${req.method}`);
  // console.log(`Route: ${req.url}, Method: ${req.method}`);
  res.json(info);
};

const getRandomNumbers = (req, res) => {
    logger.info(`Route: ${req.url}, Method: ${req.method}`);

    if (!req.query.quantity) {
        logger.error(`Route: ${req.url}, Method: ${req.method}, ErrorMessage: quantity not specified`);
        res.status(400).json({ message: "You must to specify the quantity of numbers to generate" });
    } else {
        const quantity = req.query.quantity;
        const random = randomNumber(quantity);
        // console.log(random);
        res.json(random);
    }
}

const routeNotSpecified = (req, res) => {
    logger.warn(`Route: ${req.url}, Method: ${req.method}, ErrorMessage: nonexistent route`);
    res.status(404).json({ message: "Route not found" });
}

export { getInfo, getRandomNumbers, routeNotSpecified };
