const bcrypt = require('bcryptjs'); // or 'bcryptjs' if you installed that
const users = []; // Temporary in-memory store (for now)

module.exports = {
  users,
  async createUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    return user;
  },

  async findUser(username) {
    return users.find(user => user.username === username);
  },

  async validatePassword(user, inputPassword) {
    return await bcrypt.compare(inputPassword, user.password);
  }
};

