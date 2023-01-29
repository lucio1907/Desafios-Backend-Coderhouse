const fileRegister = (req, res) => {
    res.sendFile("/BackendDesafios/Desafio-11/public/pages/register.html");
}

const userRegister = (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].includes("") || [username, email, password] === undefined) {
        return res.sendFile("/BackendDesafios/Desafio-11/public/pages/errorFields.html")
    }

    if (username.length < 4 || password.length < 4) {
        return res.sendFile("/BackendDesafios/Desafio-11/public/pages/error.html")
    }

    res.redirect("/user/login")
}



export { fileRegister, userRegister }