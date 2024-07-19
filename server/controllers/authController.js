import User from "../models/userSchema.js";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { status } from "init";



dotenv.config();

const app = express();

app.use(express.json());

export const register = async (req, res, next) => {
  try {
    
    if (!req.body.userName) {
     // console.log(req.body.userName)
      return next(createError(400, "Username is required!"));
    }

    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
      return next(createError(400, "Username already exists!"));
    }
    if (!req.body.password || req.body.password.length<6 ) {
      return res.json({
        message: "Password must be at least 6 characters long",
      })
        }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hash,
    });
    const user = await User.findOne({ email: req.body.email });
     const token = jwt.sign(
      { _id: user._id, isRecruiter: user.isRecruiter },
      process.env.JWT
    
    );
    res.status(201).json({
      status :"success",
      message:"user created",
      token,

    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      res.status(400).send(`Duplicate entry detected: A document with this ${field} already exists.`);
  } else {
      res.status(500).send('An error occurred while saving the JSON data.');
  }
  
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
   const {email , password}=req.body;
   const user=await User.findOne({email});
   if(!user) return next(new  createError(404,"user not found"))

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email"));

    const token = jwt.sign(
      { id: user._id, isRecruiter: user.isRecruiter },
      process.env.JWT,{
  
      }
    );
    res.cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user:{
        _id:user._id,
        name:user.userName,
        email:user.email,
        isRecruiter:user.isRecruiter,
        

      }});


    res.status(201).json({
      status :"success",
      message:"logged in Successfully",
      token,
      user:{
        _id:user._id,
        name:user.userName,
        email:user.email,
        isRecruiter:user.isRecruiter,
        

      }

    });
  } catch (err) {
    next(err);
  }
};

export const logout=async(req, res) => {
    res.status(201).cookie("token","",{
      httpOnly:true,

    }).json('Logout successful');// Clear the session cookie
  // }
// /);
}
export const getUser=async(req,res,next)=>{
  const user=req.user;
  res.status(200).json({
    success:true,
    user,
  })
}

