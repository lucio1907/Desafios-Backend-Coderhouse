class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  createUser(userData) {
    if (this.users.length === 0) {
      userData.id = 1;
    } else {
      userData.id = this.users[this.users.length - 1].id + 1;
    }
    this.users.push(userData);
    return userData;
  }

  deleteUserById(user) {
    this.users = this.users.filter((item) => item.id !== user.id);
    return this.users;
  }
}

const users = new Users();
export default users;
