import User from "../models/userSchema.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



dotenv.config();

const app = express();

app.use(express.json());

export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw createError(400, "User ID is missing.");
    }
    const user = await User.findById(id).select('-password');
    console.log(id);

    if (!user) {
      throw createError(404, "User not found.");
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};





export const updateProfile = async (req, res) => {
  try {
  
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true, 
    });

    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error updating user profile:', err.message); // Log the error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
};
