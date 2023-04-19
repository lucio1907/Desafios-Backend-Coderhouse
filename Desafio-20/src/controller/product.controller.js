import ProductOptions from "../classes/Products.class.js";
import schema from "../model/product.model.js";

const productOptions = new ProductOptions("Products", schema);

const getAllProducts = async (ctx, next) => {
  try {
    const request = await productOptions.getAll();
    ctx.status = request.status;
    ctx.body = request;
  } catch (err) {
    ctx.throw(400, "Error al obtener los productos");
  }
}

const addProducts = async (ctx, next) => {
  try {
    const request = await productOptions.insert(ctx.request.body);
    ctx.status = request.status;
    ctx.body = { newProduct: request.newProduct };
  } catch (err) {
    ctx.throw(400, "Error al agregar el producto");
  }
}

export { getAllProducts, addProducts };
