import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  raxorpay_order_id: { type: String, required: true },
  raxorpay_payment_id: { type: String, required: true },
  raxorpay_signature: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export const Payment = mongoose.model("Payment", paymentSchema);
