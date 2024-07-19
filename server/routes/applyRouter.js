import express from "express";
import { JobSeekerDeleteApply,JobSeekerGetAllApply,employerGetAllApply, postApply } from "../controllers/applyController.js";
import { isAuthroized } from "../utils/verifyToken.js";
const router=express.Router();

router.post("/jobSeeker/post",isAuthroized,postApply)
router.get("/jobSeeker/getAll",isAuthroized,JobSeekerGetAllApply)
router.get("/employer/getall",isAuthroized,employerGetAllApply);
router.delete("/delete/:id",isAuthroized,JobSeekerDeleteApply);
export default router
