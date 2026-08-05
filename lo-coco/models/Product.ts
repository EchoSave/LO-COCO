import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  sizes: [String],
  colors: [String],
  category: String,
  image: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
