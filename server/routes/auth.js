import express from "express";
import { login, register,logout, getUser } from "../controllers/authController.js";
import { isAuthroized, verifyRecruiter } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get('/logout', isAuthroized, logout)
router.get('/getUser', isAuthroized,getUser)

export default router