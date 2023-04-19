import axios from "axios";

(async () => {
    try {
        const response = await axios.request({
            baseURL: "http://localhost:8080",
            url: "/products",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response.status);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})();