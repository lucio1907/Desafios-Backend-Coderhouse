import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { productsRoutes } from "./routes/products.routes.js";
import ProductsManager from "./controllers/products.manager.js";
import { Container } from "./controllers/chat.manager.js";

const app = express();

app.use("/content", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  return res.redirect('/api/productos')
})

app.use("/api/productos", productsRoutes);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));

const io = new Server(server);

let messages = [];

const container = new Container();
const productsContainer = new ProductsManager();

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  
  container.create()
  productsContainer.create();

  socket.on('productos', data => {
    io.emit('history', data)
  })

  productsContainer.getAllProducts().then(products => {
    socket.emit('allProducts', products)
  })
  
  // Obtener mensajes
  container.getAllMessages().then(res => {
    // Guarda mensajes en la base
    socket.on('messages', msg => {
      container.saveMessages(msg)
      messages.push(msg)
      io.emit('user', res, messages);
    })

    // Emite los mensajes que hay en la base
    socket.emit('user', res);
  });

  socket.on('newUser', newUser => {
    io.emit('newUserAlert', newUser);
  })
});