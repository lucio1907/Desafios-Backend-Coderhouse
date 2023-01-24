import express from "express";
import path from "path";
import Login from "../controllers/userLogin.manager.js";
import userLogin from "../models/login.model.js";

const userRoutes = express.Router();

const manager = new Login("usersLogin", userLogin);

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    return res.redirect("/api/productos");
  } else {
    next();
  }
};

userRoutes.get("/login", (req, res) => {
  res.render("login");
});

userRoutes.post("/loginAction", sessionChecker, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (([username, password].includes("") || [username, password] === undefined) || (username.length < 4 || password.length < 4)) {
      return res.sendFile(path.resolve("public/errorLogin.html"))
    }

    await manager.insert(req.body);

    const user = await manager.findOne({ username });

    if (user) {
      if (user.password === password) {
        req.session.user = { username, id: user._id };
        return res.redirect("/api/productos");
      }
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

export default userRoutes;
