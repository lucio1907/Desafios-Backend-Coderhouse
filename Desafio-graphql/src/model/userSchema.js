import { buildSchema } from "graphql";

const userSchema = buildSchema(`
    type User {
        id: Int
        username: String
        email: String
        password: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        createUser(username: String, email: String, password: String): User
        deleteUserById(id: Int): [User]
    }
`);

export default userSchema;
