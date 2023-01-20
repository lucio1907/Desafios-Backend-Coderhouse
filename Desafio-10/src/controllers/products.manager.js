import knex from "knex";
import sqlOptions from "../options/mysql.options.js";
import faker from "faker";

class ProductsManager {
  constructor() {
    const db = knex(sqlOptions);
    this.db = db;
  }

  async create() {
    try {
      await this.db.schema.createTable("products", (products) => {
        products.increments("id");
        products.string("title", 50).notNullable();
        products.integer("price");
        products.string("url", 50).notNullable();
      });
    } catch (error) {
      error.code === "ER_TABLE_EXISTS_ERROR"
        ? console.log("Table products already exists")
        : console.log("Tabla creada!");
    }
  }

  async saveProduct(product) {
    try {
      await this.db("products").insert(product);
      console.log("Product added to db");
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.db.from("products").select("*");
      return products;
    } catch (error) {
      console.error(error);
    }
  }
  async generateRandomProducts() {
    const title = faker.commerce.product();
    const price = faker.commerce.price();
    const url = faker.internet.url();
    const photo = faker.image.business();

    let randomProduct = {
      title,
      price,
      url,
      photo
    };

    return randomProduct;
  }
}

export default ProductsManager;
