const form = document.getElementById("form");
const buttonLogin = document.getElementById("login");

document.addEventListener("DOMContentLoaded", () => {
    buttonLogin.addEventListener("click", (e) => {
        e.preventDefault();
        
        let userObject = {};

        const data = new FormData(form);
        data.forEach((value, key) => userObject[key] = value);

        fetch("/user/logUser", {
            method: "POST",
            body: JSON.stringify(userObject),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res)
        .then(data => {
            if (data.status === 300) {
                location.replace("/user/dashboard")
            } else { 
                location.replace("/user/failedLogin");
            }   
        })
    })
})