import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import connectionDB from "./config/connectionDB.js";
import userRegisterRoute from "./routes/userRegister.routes.js";
import initializePassport from "./config/passport.config.js";
import userLoginRoute from "./routes/userLogin.routes.js";
import infoRoute from "./routes/info.routes.js";
import apiRoute from "./routes/api.routes.js";
import cluster from "cluster";
// import { quantityCpus } from "./controllers/info.controller.js";

dotenv.config();

const app = express();

// Ejecutar archivo process.json en pm2
export const PORT = process.argv[2];

if (process.argv[3] === "CLUSTER") {
  if (cluster.isPrimary) {
    for (let i = 0; i <= 2; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker} exit`);
      cluster.fork();
    })
  } else {
    app.listen(PORT, () => console.log("Server Up! 🔥"));
  } 
} else {
  app.listen(PORT, () => console.log("Server Up! 🔥"));
}

connectionDB();

const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  key: "user_sid",
  secret: process.env.SECRET_KEY,
  cookie: { maxAge: 600000 },
  resave: true,
  saveUninitialized: true,
});

app.use("/user/login", express.static("public"));
app.use("/user/dashboard", express.static("public"));
app.use("/info", express.static("public"));
app.use("/api/randoms", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(sessionConfig);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", infoRoute);
app.use("/api/randoms", apiRoute);
app.use("/user", userRegisterRoute, userLoginRoute);


app.get("/", (req, res) => {
  res.redirect("/user/register");
});
