const Container = require("./Classes/Container.js");

const container = new Container();

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
  container.createFile()
  container.save(productsArray)
  container.getById(1)
  container.getAll()
  // container.deleteById(2)
  // container.deleteAll()
};

initApp();
