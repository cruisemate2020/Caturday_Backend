const { Schema, model, ObjectId } = require("mongoose");

const rescueStorySchema = new Schema({
  name: String,
  breed: String,
  age: Number,
  story: String,
  imageUrl: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("RescueStory", rescueStorySchema);
