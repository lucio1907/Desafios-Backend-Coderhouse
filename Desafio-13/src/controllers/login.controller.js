import path from "path";
import userModel from "../models/user.model.js";

const userLogin = (req, res) => {
  res.sendFile(path.resolve("public/pages/login.html"));
};

const login = async (req, res) => {
  res.status(300).json({ msg: "Logged in" });
};

const dashboard = (req, res) => {
  res.sendFile(path.resolve("public/pages/dashboard.html"));
};

const failedLogin = (req, res) => {
  res.sendFile(path.resolve("public/pages/errorLogin.html"));
};

const getUser = async (req, res) => {
  const user = await userModel.findById(req.session.passport.user);

  return res.status(user ? 200 : 404).json({ user: user.username });
};

const htmlLogout = (req, res) => {
  res.sendFile(path.resolve("public/pages/logout.html"));
};

const logout = async (req, res) => {
  await req.session.destroy();
  res.redirect("/user/htmlLogout");
};

export {
  userLogin,
  login,
  dashboard,
  failedLogin,
  getUser,
  htmlLogout,
  logout,
};
