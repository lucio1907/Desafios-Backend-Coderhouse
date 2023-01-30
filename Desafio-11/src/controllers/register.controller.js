import path from "path";

const fileRegister = (req, res) => {
    res.sendFile(path.resolve("public/pages/register.html"));
}

const userRegister = (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].includes("") || [username, email, password] === undefined) {
        return res.sendFile(path.resolve("public/pages/errorFields.html"))
    }

    if (username.length < 4 || password.length < 4) {
        return res.sendFile(path.resolve("public/pages/error.html"))
    }

    res.redirect("/user/login")
}



export { fileRegister, userRegister }