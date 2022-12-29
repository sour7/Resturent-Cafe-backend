import express from "express";
import {
  getAdminOrders,
  getmyOrders,
  getOrderDetails,
  placeOrder,
  placeOrderOnline,
  processOrder,
} from "../controllers/order.js";
import { isAuthenticated, adminAuthorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder);
router.post("/createorderonline", isAuthenticated, placeOrderOnline);
router.get("/myorder", isAuthenticated, getmyOrders);
router.get("/order/:id", isAuthenticated, getOrderDetails);

// add admin middleware
router.get("/admin/orders", isAuthenticated, adminAuthorize, getAdminOrders);
router.get("/admin/orders/:id", isAuthenticated, adminAuthorize, processOrder);

export default router;
