import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassword } from "./utils/provider.js";
import session from "express-session";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import passport from "passport";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

// middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET || "euryer8w7y8y9fwe",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   secure: process.env.NODE_ENV === "developement" ? false : true,
    //   httpOnly: process.env.NODE_ENV === "developement" ? false : true,
    //   sameSite: process.env.NODE_ENV === "developement" ? false : "none",
    // },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "*" || process.env.FRONTEND_URL,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.enable("trust proxy");

connectPassword();

// imports routes

app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

// using error middleware
app.use(errorMiddleware);
