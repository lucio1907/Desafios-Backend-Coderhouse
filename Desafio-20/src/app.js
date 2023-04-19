import dotenv from "dotenv";
import Koa from "koa";
import bodyParser from "koa-body-parser"
import MongoConnection from "./db/MongoConnection.js";
import router from "./routes/product.routes.js";

dotenv.config();

const app = new Koa();

app.use(bodyParser());

MongoConnection.connection();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server up!"));
