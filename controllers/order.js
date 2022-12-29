import { Order } from "../models/Order.js";
import asyncHandler from "express-async-handler";

export const placeOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;
  const user = "req.user._id";
  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(200).json({
    success: true,
    message: "Order has been Placed Successfully via COD",
  });
});

export const placeOrderOnline = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;
  const user = "req.user._id";
  const orderOptions = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(200).json({
    success: true,
    message: "Order has been Placed Successfully via COD",
  });
});

export const getmyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    order,
  });
});

export const getOrderDetails = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) return next(new Error("Invalid Order Id", 404));

  res.status(200).json({ success: true, order });
});

export const getAdminOrders = asyncHandler(async (req, res, next) => {
  const adminOrder = await Order.find().populate("user", "name");
  res.status(200).json({ success: true, adminOrder });
});

export const processOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new Error("Invalid Order id ", 404));

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    (order.orderStatus = "Delivered"),
      (order.deliveredAt = new Date(Date.now()));
  } else if (order.orderStatus === "Delivered")
    return next(new Error("product already Delivered !", 400));

  await order.save();

  res
    .status(200)
    .json({ success: true, menubar: "Order Status updated sucessfully" });
});
