import express from "express";
import { addProducts, getAllProducts } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProducts);

export default router;