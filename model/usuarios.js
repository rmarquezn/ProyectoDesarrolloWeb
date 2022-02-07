let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  actividades: Array,
});

module.exports = mongoose.model("usuarios", UserSchema);
