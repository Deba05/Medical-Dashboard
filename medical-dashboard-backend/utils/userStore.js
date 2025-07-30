const users = []; // In-memory user store

function addUser(username, password) {
  users.push({ username, password });
}

function findUser(username) {
  return users.find(user => user.username === username);
}

module.exports = { addUser, findUser };

