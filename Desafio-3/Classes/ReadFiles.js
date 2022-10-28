const fs = require('fs')

class Files {
    constructor (file) {
        this.file = file
    }

    readFile() {
        const productsArrayString = fs.readFileSync(this.file, 'utf-8')
        const productsArray = JSON.parse(productsArrayString)

        return productsArray
    }
}

module.exports = Files