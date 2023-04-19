import { graphqlHTTP } from "express-graphql";
import schema from "../model/schema.js";
import userSchema from "../model/userSchema.js";
import product from "../class/Products.js";
import users from "../class/Users.js";

const routeProduct = graphqlHTTP({
  schema,
  rootValue: {
    products: () => product.getProducts(),
    createProduct: (productData) => product.createProduct(productData),
    deleteProductById: (id) => product.deleteProductById(id),
  },
  graphiql: true,
});

const routeUser = graphqlHTTP({
  schema: userSchema,
  rootValue: {
    users: () => users.getUsers(),
    createUser: (userData) => users.createUser(userData),
    deleteUserById: (user) => users.deleteUserById(user),
  },
  graphiql: true,
});

export { routeProduct, routeUser };
