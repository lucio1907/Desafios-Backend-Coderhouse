const fs = require("fs");
module.exports = class Container {
  createFile(file) {
    try {
      if (!fs.existsSync(file)) {
        fs.promises.writeFile(file, '', 'UTF-8')
        return true
      } else {
        console.log(`Ya existe el archivo "${file.toUpperCase()}"`);
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }

  readFiles(file) {
    let allProducts = [];

    try {
      let allProductsString = fs.readFileSync(file, "utf-8");

      // Parsear los resultados que haya en el archivo en caso de que estén
      if (allProductsString.length > 0) return (allProducts = JSON.parse(allProductsString));
      // Sino devolver un array vacío
      return (allProducts = []);
    } catch (error) {
      console.error(error);
    }

    return allProducts;
  }

  writeFiles(products, file) {
    // Pasar a string los productos para poder insertarlos en el archivo
    let productsString = JSON.stringify(products);

    try {
      fs.writeFileSync(file, productsString);
    } catch (error) {
      console.error(error);
    }
  }

  autoIncrementId(file) {
    let id = 0;
    const allProducts = this.readFiles(file);

    if (allProducts.length > 0) {
      id = allProducts[allProducts.length - 1].id;
    }

    return id + 1;
  }

  save(product, file) {
    try {
      let nextId = this.autoIncrementId(file);

      product.id = nextId;

      const allProducts = this.readFiles(file);

      allProducts.push(product);

      this.writeFiles(allProducts, file);
    } catch (error) {
      console.error(error);
    }
  }

  getById(id, file) {
    const allProducts = this.readFiles(file);

    const oneProduct = allProducts.find((productId) => productId.id === id);

    return oneProduct ? oneProduct : null;
  }

  getAll(file) {
    return fs.readFileSync(file, "utf-8");
  }

  deleteById(id, file) {
    const allProducts = this.readFiles(file);

    const productDeleted = allProducts.filter((productId) => productId.id !== id);
    const productDeletedToString = JSON.stringify(productDeleted)

    try {
      fs.writeFileSync(file, productDeletedToString)  
    } catch (error) {
      console.error(error);
    }
  }

  deleteAll(file) {
    const allProductsArrayEmpty = []
    const allProductsToString = JSON.stringify(allProductsArrayEmpty)

    try {
      fs.writeFileSync(file, allProductsToString)
    } catch (error) {
      console.error(error);
    }
  }
};
