import { randomNumber } from "../utils/utils.js";

class RandomNumberDaoArray {
    constructor () {
        this.array = [];
    }

    async getAll() {
        return { message: this.array, status: 200 };
    }

    async generateRandomNumbers(query) {
        if (!query.quantity) {
            return { message: "You must to specify the quantity of numbers to generate", status: 400 }
        } else {
            const quantity = query.quantity;
            const random = randomNumber(quantity);
            this.array.push(random);
        }
    }
}

export default RandomNumberDaoArray;