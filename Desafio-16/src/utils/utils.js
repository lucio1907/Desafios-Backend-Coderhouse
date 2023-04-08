import log4js from "log4js";

const logConfiguration = log4js.configure({
  appenders: {
    console: {
      type: "console",
    },
    debugConsole: {
      type: "file",
      filename: "./loggers.log",
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "ALL",
    },
    DEV: {
      appenders: ["console"],
      level: "ALL",
    },
    PROD: {
      appenders: ["debugConsole"],
      level: "ALL",
    },
  },
});

const randomNumber = (quantity) => {
  let result = {};
  for (let i = 1; i <= quantity; i++) {
    const randomNumber = Math.floor(Math.random() * quantity + 1);
    if (result[randomNumber]) {
      result[randomNumber] += 1;
    } else {
      result[randomNumber] = 1;
    }
  }
  return result;
};

export { logConfiguration, randomNumber };
