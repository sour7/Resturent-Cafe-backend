import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";

export const myProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid");

    res.status(200).json({ message: "Logged out Successfully!" });
  });
};

export const getAdminUser = asyncHandler(async (req, res) => {
  const adminUser = await User.find();
  res.status(200).json({ success: true, adminUser });
});

export const getAdminStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();

  const orders = await Order.find();

  const preparingOrder = orders.filter((i) => i.orderStatus === "Preparing");
  const shippedOrder = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrder = orders.filter((i) => i.orderStatus === "Delivered");

  let totatIncome = 0;

  orders.forEach((element) => {
    totatIncome += element.totalAmount;
  });

  res.status(200).json({
    success: true,
    userCount,
    ordersCount: {
      total: orders.length,
      preparing: preparingOrder.length,
      shipped: shippedOrder.length,
      delivered: deliveredOrder.length,
    },
    // orders,
    totatIncome,
  });
});
