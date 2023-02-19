const userDashboard = document.getElementById("userWelcome");

document.addEventListener("DOMContentLoaded", () => {
    const fetching = async () => {
        const url = "/user/getUser";

        const response = await fetch(url);
        const data = await response.json()
        userDashboard.innerHTML = `Welcome <span class="text-indigo-500">${data.user}</span>`;
    }

    fetching()
})