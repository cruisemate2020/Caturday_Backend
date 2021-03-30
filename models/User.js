const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  location: { type: String },
  email: { type: String, unique: true, required: true },
});

module.exports = model("User", userSchema);
