import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    hNo: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneno: { type: Number, required: true },
  },

  orderItems: {
    burger: {
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    cheezeBurger: {
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    kingBurger: {
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

  paymentMethod: {
    type: String,
    enum: ["COD", "online"],
    default: "COD",
  },
  paymentInfo: { type: mongoose.Schema.ObjectId, ref: "Payment" },
  paidAt: Date,
  itemPrice: { type: Number, default: 0 },
  taxPrice: { type: Number, default: 0 },
  shippingCharges: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  orderStatus: {
    type: String,
    enum: ["Preparing", "Shipped", "Delivered"],
    default: "Preparing",
  },
  deliveredAt: Date,
  createdAt: { type: Date, default: Date.now() },
});

export const Order = mongoose.model("Order", orderSchema);
