import mongoose from "mongoose";

class ProductOptions {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async getAll() {
        try {
            const getProduct = await this.collection.find().select("-__v -createdAt -updatedAt");

            if (getProduct.length === 0) {
                const error = new Error("There are no products yet");
                return { message: error.message, status: 404 }
            }

            return { allProducts: getProduct, status: 200 }
        } catch (error) {
            console.error(error);
        }
    }

    async insert(product) {
        try {
            if ([product.productName, product.description, product.stock, product.price].includes("")) {
                const error = new Error("Shouldn't be fields empty");
                return { message: error.message, status: 400 }; 
            }

            const newProductInDB = await this.collection.insertMany(product);
            return { newProduct: newProductInDB, status: 200 };
        } catch (error) {
            console.error(error);
        }
    }
}

export default ProductOptions;