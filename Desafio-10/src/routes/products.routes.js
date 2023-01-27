import express from "express";
import ProductsManager from "../controllers/products.manager.js";

const productsRoutes = express.Router();

const manager = new ProductsManager();

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    return res.redirect("/user/login");
  }
};

productsRoutes.get("/", sessionChecker, (req, res) => {
  return res.render("forms", { username: req.session.user });
});

productsRoutes.post("/", async (req, res) => {
  const product = req.body;

  if (
    Object.values(product) === "" ||
    isNaN(product.price) ||
    product.price <= 0
  ) {
    const error = new Error("Field empty");
    return res.status(404).json({ msg: error.message });
  } else {
    await manager.saveProduct(product);

    let result = await manager.getAllProducts();
    console.log(result);
  }
});

export { productsRoutes };
