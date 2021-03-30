const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const catSchema = new Schema({
  name: String,
  description: String,
  temperament: String,
  life_span: String,
  wikipedia_url: String,
  origin: String,
  weight: String,
  hypoallergenic: Number,
  affection_level: Number,
  child_friendly: Number,
  dog_friendly: Number,
  energy_level: Number,
  grooming: Number,
  intelligence: Number,
  shedding_level: Number,
  stranger_friendly: Number,
  image_url: String,
});

module.exports = model("Cat", catSchema);
