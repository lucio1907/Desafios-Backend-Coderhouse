class Product {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  createProduct(product) {
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }
    this.products.push(product);
    return product;
  }

  deleteProductById(data) {
    this.products = this.products.filter((item) => item.id !== data.id);
    return this.products;
  }
}

const product = new Product();
export default product;
