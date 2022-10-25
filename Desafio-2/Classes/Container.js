const fs = require("fs");
module.exports = class Container {
  async createFile(file) {
    try {
      if (fs.existsSync(file)) {
        console.log(`Ya existe el archivo "${file.toUpperCase()}"`);
        return false;
      } else {
        await fs.promises.writeFile(file, "", "UTF-8");
        return true;
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
      if (allProductsString.length > 0) {
        return allProducts = JSON.parse(allProductsString);
      } else {
        // Sino devolver un array vacío
        return allProducts = [];
      }
    } catch (error) {
      console.error(error);
    }

    return allProducts;
  }

  async writeFiles(products, file) {
    // Pasar a string los productos para poder insertarlos en el archivo
    let productsString = JSON.stringify(products);

    try {
      await fs.writeFileSync(file, productsString);
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

  async getAll(file) {
    return await fs.readFileSync(file, "utf-8");
  }

  deleteById(id, file) {
    const allProducts = this.readFiles(file);
    const productDeleted = allProducts.filter((productId) => productId.id !== id);

    try {
      this.writeFiles(productDeleted, file);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll(file) {
    const allProductsArrayEmpty = [];

    try {
      await this.writeFiles(allProductsArrayEmpty, file);
    } catch (error) {
      console.error(error);
    }
  }
};
