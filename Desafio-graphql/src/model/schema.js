import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
        id: Int
        productName: String
        description: String
        stock: String
        price: String
    }

    type Query {
        products: [Product]
    }

    type Mutation {
        createProduct(productName: String, description: String, stock: String, price: String): Product
        deleteProductById(id: Int): [Product]
    }
`);

export default schema;
