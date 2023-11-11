const mongoose = require("../config/db");
const { Schema } = mongoose;

const user = new Schema({
  username: { type: String, unique: true },
  names: { type: String },
  lastNames: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

// Correspondencia de la colección en la bd
const User = mongoose.model("User", user);

module.exports = User;
