const Container = require("./Classes/Container.js");

const container = new Container();

const file = "productos.txt";
const productsArray = [
  {
    title: "TV",
    price: 500,
    thumbnail: "www.google.com",
  },
  {
    title: "Celular",
    price: 200,
    thumbnail: "www.google.com",
  },
  {
    title: "Tablet",
    price: 300,
    thumbnail: "www.google.com",
  },
];

const initApp = () => {
  const newFile = container.createFile(file);
  newFile ? saveAllProducts() : console.log("No se pudieron guardar los datos");
  newFile ? getAllProducts() : console.log("No se pudo traer los datos");

//   const productFound = newFile && getProductById(2);
//   !productFound ? deleteById(2) : console.log("No se pudo borrar tu producto");

//   deleteAllProducts();
};

const saveAllProducts = () => {
  productsArray.map((product) => container.save(product, file));
};

const getAllProducts = () => {
  const allProducts = container.getAll(file);
  allProducts ? console.log("Todos tus productos: ", allProducts) : null;
};

const getProductById = (number) => {
  const uniqueProduct = container.getById(number, file);
  uniqueProduct ? console.log("Tu producto: ", uniqueProduct) : null;
};

const deleteById = (number) => {
  const uniqueProduct = container.deleteById(number, file);
  uniqueProduct ? console.log("Se borró el producto: ", uniqueProduct) : null;
};

const deleteAllProducts = () => {
  const allProducts = container.deleteAll(file);
  allProducts
    ? console.log("Se borro toda la lista")
    : console.log("No se puede borrar porque ya se ha borrado");
};

initApp();
