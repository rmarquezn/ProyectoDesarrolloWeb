let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  id: Number,
  hash: String,
  email: String,
});

module.exports = mongoose.model("login", LoginSchema);
