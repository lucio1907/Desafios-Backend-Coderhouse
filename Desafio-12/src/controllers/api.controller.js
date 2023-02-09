import { fork } from "child_process";

const getRandomNumber = (req, res) => {
  let qty = Math.pow(1000, 3);

  const result = fork("src/utils/getRandomNumber.js");

  if (req.query.qty) qty = req.query.qty;

  result.send(qty);

  result.on("message", (data) => {
    res.json(data);
  });
};

export { getRandomNumber };
