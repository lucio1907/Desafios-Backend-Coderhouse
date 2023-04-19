import Router from "koa-router";
import { addProducts, getAllProducts } from "../controller/product.controller.js"

const router = new Router({
    prefix: "/products"
});

router.get("/", getAllProducts);

router.post("/", addProducts);

export default router;