import mongoose from "mongoose";

class Login {
    constructor (collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async insert(user) {
        try {
            const userSaved = await this.collection.create(user);
            
            return userSaved;
        } catch (error) {
            console.error(`❌ Error: ${error}`);
        }
    }

    async findOne(user) {
        try {
            const getUser = await this.collection.findOne(user);
            return getUser;
        } catch (error) {
            console.error(`❌ Error: ${error}`);
        }
    }
}

export default Login;