import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import session from "express-session";
import { Server } from "socket.io";
import { productsRoutes } from "./routes/products.routes.js";
import userRoutes from "./routes/user.routes.js";
import ProductsManager from "./controllers/products.manager.js";
import { Container } from "./controllers/chat.manager.js";
import connectionDB from "./config/mongoDB.js";
import Login from "./controllers/userLogin.manager.js";

const app = express();
const Store = FileStore(session);

app.use("/content", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  key: process.env.SID,
  store: new Store({
    path: "./sessions",
    ttl: 600
  }),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

connectionDB();

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
  return res.redirect("/user/login");
})

app.use("/api/productos", productsRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));

const io = new Server(server);

let messages = [];

const container = new Container();
const productsContainer = new ProductsManager();

io.on("connection", async (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('productos', data => {
    io.emit('history', data)
  })

  // const products = await productsContainer.getAllProducts();
  // socket.emit('allProducts', products)
  
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