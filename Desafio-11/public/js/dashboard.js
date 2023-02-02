const userDashboard = document.getElementById("userWelcome");

document.addEventListener("DOMContentLoaded", () => {
    fetch("/user/getUser", { method: "GET" })
    .then(res => res.json())
    .then(data => console.log(data))
})