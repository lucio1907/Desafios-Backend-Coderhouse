const fs = require("fs");
module.exports = class Container {
  constructor() {
    this.idProducts = 0
    this.file = 'productos.txt'
  }

  async createFile() {
    try {
      if (fs.existsSync(this.file)) {
        await console.log(`Ya existe el archivo "${this.file.toUpperCase()}"`);
        return false;
      } else {
        await fs.promises.writeFile(this.file, "", "UTF-8");
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  autoIncrementId(products) {
    let productsArray = []
    products.map(product => {
      this.idProducts += 1
      product.id = this.idProducts
      productsArray = [...productsArray, product]
    })
    return productsArray
  }

  async save(products) {
    const idProduts = this.autoIncrementId(products)

    try {
      await fs.promises.writeFile(this.file, JSON.stringify(idProduts))
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const productsString = await fs.promises.readFile(this.file, 'utf-8')
      const productsArray = await JSON.parse(productsString)
      
      const productId = productsArray.find(productId => productId.id === id)
      
      console.log('\n------------------------ Tu producto --------------------------------');
      productId ? console.log(productId) : console.log('No hay productos');
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const productsString = await fs.promises.readFile(this.file, 'utf-8')
      const productsArray = await JSON.parse(productsString)

      console.log('\n--------------------- Todos tus productos ---------------------------');
      console.log(productsArray);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const productsString = await fs.promises.readFile(this.file, 'utf-8')
      const productsArray = await JSON.parse(productsString)
      
      const productDeleted = productsArray.filter(productId => productId.id !== id)
      
      console.log(`\nSe ha eliminado el producto con el id ${id}`);

      const productDeletedToString = await JSON.stringify(productDeleted)
      
      await fs.promises.writeFile(this.file, productDeletedToString)
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    const arrayProductsEmpty = []
  
    try {
      await fs.promises.writeFile(this.file, JSON.stringify(arrayProductsEmpty))
    } catch (error) {
      console.error(error);
    }
  }
};
