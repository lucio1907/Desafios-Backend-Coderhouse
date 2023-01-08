import * as dotenv from 'dotenv';
dotenv.config();

const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.PASSWORD,
        database: process.env.DATABASE_NAME
    }
}

export default options;