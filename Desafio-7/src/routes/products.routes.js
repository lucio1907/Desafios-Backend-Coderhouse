import express from "express";
import ProductsManager from "../controllers/products.manager.js";

const productsRoutes = express.Router();

const manager = new ProductsManager();

// let products = []

productsRoutes.get('/', (req, res) => {
  return res.render("forms");
})

productsRoutes.post("/", (req, res) => {
  const product = req.body;
  

  if (Object.values(product) === "" || isNaN(product.price) || product.price <= 0) {
    const error = new Error("Field empty");
    let result = manager.getAllProducts();
    result.then(products => {
      return res.send({ msg: error.message, products });
    })
  } else {
    manager.saveProduct(product);

    let result = manager.getAllProducts();
    result.then(products => {
      return res.send({ msg: "Product Added", products });
    })
  }
});

export { productsRoutes };
