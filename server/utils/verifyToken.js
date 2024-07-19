import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/userSchema.js"
export const isAuthroized =async (req, res, next) => {

  const {token} = req.cookies;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  const decoder=jwt.verify(token, process.env.JWT);
  req.user = await User.findById(decoder.id).select('-password');
  // console.log(req.user);
  next();

};

export const verifyUser = (req, res, next) => {
  isAuthroized(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isRecruiter) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyRecruiter = (req, res, next) => {
  isAuthroized(req, res, next, () => {
    if (req.user.isRecruiter) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
