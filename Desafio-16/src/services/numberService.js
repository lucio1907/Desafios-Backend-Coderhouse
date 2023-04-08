import Factory from "../dao/PersistenceFactory.js";

class NumberService {
    constructor () {
        this.numbersDao;
        this.#init();
    }

    async #init() {
        return this.numbersDao = await Factory.getPersistence();
    }

    async generateRandomNumber(query) {
        return await this.numbersDao.generateRandomNumbers(query);
    }

    async getAllNumbers() {
        return await this.numbersDao.getAll();
    }
}

export default NumberService;