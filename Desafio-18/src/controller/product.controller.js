import ProductOptions from "../classes/Products.class.js";
import schema from "../model/product.model.js";

const productOptions = new ProductOptions("Products", schema);

const getAllProducts = async (req, res) => {
    const request = await productOptions.getAll();
    res.status(request.status).json(request);
}

const addProducts = async (req, res) => {
    const request = await productOptions.insert(req.body);
    res.status(request.status).json({ newProduct: request.newProduct })
}

export { getAllProducts, addProducts };