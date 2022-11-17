import express from "express";

const routeProducts = express.Router();

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

routeProducts.get("/", (req, res) => {
  if (products.length <= 0) {
    const error = new Error("There are not products yet, add one!");
    return res.render('form', {msg: error.message})
  }

  return res.render('form', { msg: 'Insert your products here' })
});

routeProducts.get("/:id", (req, res) => {
  const { id } = req.params;
  const productId = products[id - 1];

  if (id > products.length || id <= 0 || isNaN(id)) {
    const error = new Error("Product not Found!");
    return res.status(404).json({ msg: error.message });
  }

  if (id === "") {
    const error = new Error("Not ID assignment");
    return res.status(400).json({ msg: error.message });
  } else {
    return res.json({ productId });
  }
});

routeProducts.put("/:id", (req, res) => {
  const { title, price, url } = req.body;
  const { id } = req.params;
  const productId = products[id - 1];

  if (isNaN(id)) {
    const error = new Error("Not a number");
    return res.status(400).json({ msg: error.message });
  }

  if (id > products.length || id <= 0) {
    const error = new Error("You can't edit if the product don't exists");
    return res.status(400).json({ msg: error.message });
  } else {
    productId.title = title;
    productId.price = price;
    productId.url = url;

    return res.json({ productId });
  }
});

routeProducts.delete("/:id", (req, res) => {
  const { id } = req.params;
  const newArrayProducts = products.filter((prod) => prod.id != id);
  products = newArrayProducts;

  if (isNaN(id)) {
    const error = new Error("Not a number");
    return res.status(400).json({ msg: error.message });
  }

  if (newArrayProducts.length === 0) {
    const error = new Error("All products was deleted!");
    return res.status(400).json({ msg: error.message });
  }

  if (id <= 0) {
    const error = new Error("The ID cannot be a negative number");
    return res.status(400).json({ msg: error.message });
  }

  if (newArrayProducts.indexOf(id) === -1) {
    return res.json({
      msg: `The product with ID ${id} was Deleted!`,
      newArrayProducts,
    });
  }
});

routeProducts.post("/", middlewareProducts, (req, res) => {
  const product = req.body;

  if (product.title === '' || isNaN(product.price) || product.price <= 0 || product.url === '') {
    const error = new Error('Field empty')
    return res.render('productList', { msg: error.message, products })
  } else {
    products.push(product);
    return res.render('productList', {msg: 'Product Added', products});
  }
});

export { routeProducts };