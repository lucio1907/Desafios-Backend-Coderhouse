import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MongoConnection from "./db/MongoConnection.js";
import productsRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

MongoConnection.connection();

app.use("/products", productsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server up!"));