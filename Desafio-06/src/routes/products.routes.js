import express from "express";

const productsRoutes = express.Router();

let products = [];

const middlewareProducts = (req, res, next) => {
  const product = req.body;
  let id = 1;
  product.id = id;

  products.map(() => {
    id += 1;
    product.id = products[products.length - 1].id + 1;
  });
  next();
};

productsRoutes.get("/", (req, res) => {
  if (products.length <= 0) {
    const error = new Error("There are not products yet, add one!");
    return res.send({ msg: error.message });
  }

  if (products.length > 0) return res.send({ msg: "Insert your products here", products });
});

productsRoutes.post("/", middlewareProducts, (req, res) => {
  const product = req.body;

  if (product.title === "" || isNaN(product.price) || product.price <= 0 || product.url === "") {
    const error = new Error("Field empty");
    return res.send({ msg: error.message, products });
  } else {
    products.push(product);
    return res.send({ msg: "Product Added", products });
  }
});

export { productsRoutes };
