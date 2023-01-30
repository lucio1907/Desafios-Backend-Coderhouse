import path from "path";
import userModel from "../models/user.model.js";

const userLogin =  (req, res) => {
    res.sendFile(path.resolve("public/pages/login.html"))
}

const login = async (req, res) => {
    console.log(req.session);
    res.status(300).json({ msg: "Logged in" });
}

const dashboard = (req, res) => {
    res.sendFile(path.resolve("public/pages/dashboard.html"))
}

const failedLogin = (req, res) => {
    res.sendFile(path.resolve("public/pages/errorLogin.html"))
}

const getUser = async (req, res) => {
    const { user } = req.session.passport;

    const getUserDB = await userModel.findById(user._id) 

    res.json({ user: getUserDB.username })
}

export { userLogin, login, dashboard, failedLogin, getUser }