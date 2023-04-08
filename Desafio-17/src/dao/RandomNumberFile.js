import __dirname from "../path.js";
import fs from "fs";
import { randomNumber } from "../utils/utils.js";

class RandomNumberDaoFile {
    constructor() {
        this.path = __dirname + '/files/numbers.json'
        this.#init();
    }

    #init = async() => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
    }

    async readFile() {
        const result = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(result);
    }

    async getAll() {
        const result = await this.readFile();
        return { message: result, status: 200 };
    }

    async generateRandomNumbers(query) {
        if (!query.quantity) {
            return { message: "You must to specify the quantity of numbers to generate", status: 400 }
        } else {
            const quantity = query.quantity;
            const random = randomNumber(quantity);
            
            try {
                const numbers = await this.readFile();
                numbers.push(random)
                await fs.promises.writeFile(this.path, JSON.stringify(numbers, null, 5))
                return numbers;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default RandomNumberDaoFile;