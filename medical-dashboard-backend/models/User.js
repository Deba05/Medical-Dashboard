// const bcrypt = require('bcryptjs'); // or 'bcryptjs' if you installed that
// const users = []; // Temporary in-memory store (for now)

// module.exports = {
//   users,
//   async createUser(username, password) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = { username, password: hashedPassword };
//     users.push(user);
//     return user;
//   },

//   async findUser(username) {
//     return users.find(user => user.username === username);
//   },

//   async validatePassword(user, inputPassword) {
//     return await bcrypt.compare(inputPassword, user.password);
//   }
// };
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'doctor' },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }] // 🆕 link patients
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static helpers
userSchema.statics.createUser = async function (username, password) {
  const user = new this({ username, password, patients: [] }); // 🆕 empty patients array
  return await user.save();
};

userSchema.statics.findUser = async function (username) {
  return await this.findOne({ username });
};

module.exports = mongoose.model('User', userSchema);


