import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  photoUrl: String,
  type: String,
  description: String,
  company_name: String,
  amount_per_strip: String,
  category: String,
  stock: String,
  variants: [{}],
});

delete mongoose.models.products;
const Product = mongoose.model("products", productSchema);

export default Product;
