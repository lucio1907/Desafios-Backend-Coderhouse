import axios from "axios";

(async () => {
    const data = {
        productName: "Iphone 13",
        description: "Iphone 13 with charger included",
        stock: 10,
        price: 1200
    }

    try {
        const response = await axios.request({
            baseURL: "http://localhost:8080",
            url: "/products",
            method: "POST",
            data,
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