import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { productsRoutes } from "./routes/products.routes.js";
import { Container } from "./Container.js";

const app = express();

app.use("/content", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  return res.render("forms");
});

app.use("/api/productos", productsRoutes);


const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));

const io = new Server(server);

let messages = [];
const container = new Container();

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('productos', data => {
    io.emit('history', data)
  })
  
  socket.on('messages', msg => {
    container.saveMessages(msg)
    messages.push(msg);
    io.emit('user', messages);
  })

  socket.emit('user', container.getAllMessages());

  socket.on('newUser', newUser => {
    io.emit('newUserAlert', newUser);
  })
});