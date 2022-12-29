import express from "express";
import passport from "passport";
import {
  myProfile,
  logout,
  getAdminUser,
  getAdminStats,
} from "../controllers/user.js";
import { isAuthenticated, adminAuthorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: process.env.FRONTEND_URL || "http://localhost:8000",
  })
);

router.get("/me", isAuthenticated, myProfile);
router.get("/logout", logout);
router.get("/admin/users", isAuthenticated, adminAuthorize, getAdminUser);
router.get("/admin/stats", isAuthenticated, adminAuthorize, getAdminStats);

export default router;
