import express, { urlencoded } from "express";
import { routeProducts } from "./routes/products.routes.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/productos', routeProducts)

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running in port http://localhost:${PORT}`));

app.set("views", "./views");
app.set("view engine", "pug");