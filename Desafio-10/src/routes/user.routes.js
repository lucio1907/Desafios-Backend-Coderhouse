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

userRoutes.get("/login", sessionChecker, (req, res) => {
  res.render("login");
});

userRoutes.post("/loginAction", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (([username, password].includes("") || [username, password] === undefined) || (username.length < 4 || password.length < 4)) {
      return res.sendFile(path.resolve("public/errorLogin.html"))
    }

    await manager.insert(req.body);

    const user = await manager.findOne({ username });

    if (user) {
      if (user.password === password) {
        req.session.user = { username: user.username, id: user._id };
        req.session.save();
        res.redirect("/api/productos")
      }
    }

    if (!user) return res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
});

userRoutes.get("/getUser", (req, res) => {
  return res.json({ username: req.session.user.username });
})

userRoutes.get("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    req.session.destroy()
    res.clearCookie("user_sid");
    res.redirect("/");
  } else {
    res.redirect("/user/login");
  }
});

export default userRoutes;
