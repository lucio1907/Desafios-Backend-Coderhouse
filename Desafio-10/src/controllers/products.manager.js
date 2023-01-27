import mongoose from "mongoose";
import productsModel from "../models/products.model.js";

class ProductsManager {
  constructor() {
    this.collection = mongoose.model("products", productsModel)
  }

  async saveProduct(product) {
    try {
      const newProduct = await this.collection.create(product);
      console.log(newProduct);
    } catch (error) {
      console.error(`❌ Error: ${error}`);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.collection.find();
      return products
    } catch (error) {
      console.error(`❌ Error: ${error}`);
    }
  }
}

export default ProductsManager;
