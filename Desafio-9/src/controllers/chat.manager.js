import knex from "knex";
import sqliteOptions from "../options/sqlite3.config.js";

const database = knex(sqliteOptions);

class Container {
  constructor() {
    const database = knex(sqliteOptions);
    this.db = database; 
  }

  async create() {
    try {
      await this.db.schema.createTable("chat", (messages) => {
        messages.increments("id");
        messages.integer('user');
        messages.string("message", 50).notNullable();
        messages.string('date', 50).notNullable();
      })
    } catch (error) {
      error.errno === 1 ? console.log('Table chat already exists') : console.log("Table created")
    }
}

  async saveMessages(message) {
    try {
      await this.db('chat').insert(message);
      console.log('Message Saved');
    } catch (error) {
      console.error(error);
    }
  }

  async getAllMessages() {
    try {
      const messages = await database.from('chat').select('*');
      return messages;
    } catch (error) {
      console.error(error)
    }
  }
}

export { Container };
