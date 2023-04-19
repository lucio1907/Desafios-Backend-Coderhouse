import express from "express";
import { routeProduct, routeUser } from "./routes/principalRoutes.routes.js";

const app = express();

app.listen(8080, () => console.log("Server up"));

app.use("/products", routeProduct);
app.use("/users", routeUser);
