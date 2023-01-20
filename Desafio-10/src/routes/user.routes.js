import express from "express";
import knex from "knex";
import sqliteOptions from "../options/sqlite3.config.js";

const db = knex(sqliteOptions)

const userRoutes = express.Router();

userRoutes.get("/login", (req, res) => {
    res.render("login")
})

userRoutes.post("/loginAction", async (req, res) => {
    const { username, password } = req.body;

    // ! TERMINAR ACA
    try {
        
    } catch (error) {
        console.error(error);
    }

    res.json({msg: "ok"})
})

export default userRoutes;