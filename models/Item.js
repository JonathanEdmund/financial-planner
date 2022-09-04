import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  date: Date,
  description: String,
  _userId: String,
});

const Item = new mongoose.model("item", itemSchema);

export default Item;
