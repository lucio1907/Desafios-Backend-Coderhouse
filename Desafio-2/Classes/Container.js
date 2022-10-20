const fs = require("fs");

class Container {
    readFiles(file) {
        let allProducts = []

        try {
            let allProductsString = fs.readFileSync(file, 'utf-8') 
            
            if (allProductsString.length > 0) {
                allProducts = JSON.parse(allProductsString)
                return
            } else {
                allProducts = []
                return
            }
        } catch (error) {
            console.error(error);
        }
        
        return allProducts
    }

    save(object) {
        console.log(object);
    }

    getById(id) {

    }

    getAll() {

    }

    deleteById(id) {

    }

    deleteAll() {
        
    }
}

export default Container