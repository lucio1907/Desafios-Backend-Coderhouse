const userDashboard = document.getElementById("userWelcome");

const generateTitle = () => {
    // ! ARREGLAR ACA - TIRA BAD REQUEST
    fetch("../getUser")
    .then(res => res.text())
    .then(data => console.log(data))

}

generateTitle()