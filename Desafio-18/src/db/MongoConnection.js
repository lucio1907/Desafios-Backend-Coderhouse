import mongoose from "mongoose";

class MongoConnection {
    static async connection() {
        try {
            const connection = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const url = `${connection.connection.host}:${connection.connection.port}`;

            console.log(`Mongo connected ${url}`);
        } catch (error) {
            console.error(error);
        }
    }
}

export default MongoConnection;