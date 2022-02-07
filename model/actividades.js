let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActividadesSchema = new Schema({
  tipo: String,
  hora: Number,
  duracion: Number,
  calorias: Number,
});

module.exports = mongoose.model("actividades", ActividadesSchema);
