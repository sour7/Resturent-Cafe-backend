import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"];
  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Not Authenticated ", 401));
  }
  next();
};

export const adminAuthorize = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access Denied !", 405));
  }
  next();
};
