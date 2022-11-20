import express from "express";
import { routeProducts } from "./routes/products.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use('/api/productos', routeProducts)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));
