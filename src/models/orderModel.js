import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  status: String,
  paymentMethode: String,
  paid: Boolean,
  name: String,
  phone: String,
  address: String,
  createdAt: String,
  totalRegularPrice: Number,
  totalDiscount: Number,
  totalPrice: Number,
  carts: [{}],
});

delete mongoose.models.orders;
const Order = mongoose.model("orders", orderSchema);

export default Order;
