const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// users is the collection name
const User = mongoose.model("users", userSchema);

module.exports = User;
