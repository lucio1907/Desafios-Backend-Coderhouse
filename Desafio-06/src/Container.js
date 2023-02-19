import fs from "fs";

const _CHATFILE = "chat.json";

class Container {
  constructor() {
    this.chat = [];
  }

  async saveMessages(message) {
    try {
      if (fs.existsSync(_CHATFILE)) {
        const messages = await fs.promises.readFile(_CHATFILE, "utf-8");
        const chat = JSON.parse(messages);
        message = {
          user: message.user,
          msg: message.msg,
          date: message.date,
        };
        chat.push(message);
        await fs.promises.writeFile(_CHATFILE, JSON.stringify(chat, null, 2));
        return chat;
      } else {
        message = {
          user: message.user,
          msg: message.msg,
          date: message.date,
        };
        await fs.promises.writeFile(_CHATFILE, JSON.stringify([message], null, 2));
        return [message];
      }
    } catch (error) {
      console.error(error);
    }
  }

  getAllMessages() {
    try {
      if (fs.existsSync(_CHATFILE)) {
        const messages = fs.readFileSync(_CHATFILE, 'utf-8');
        this.chat = JSON.parse(messages);
      }
    } catch (error) {
      console.error(error);
    }

    return this.chat;
  }
}

export { Container };
