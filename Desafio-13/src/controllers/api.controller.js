import { PORT } from "../app.js";
import randomNumber from "../utils/getRandomNumber.js";

const getRandomNumber = (req, res) => {
  let qty = Math.pow(1000, 3);
  
  if (req.query.qty) qty = req.query.qty;
  
  const result = randomNumber(qty);

  res.json({ processID: process.pid, port: PORT, result });
};

export { getRandomNumber };
