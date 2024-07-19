import {Apply}  from "../models/applySchema.js";
import { createError } from "../utils/error.js";
import cloudinary from 'cloudinary';
import Job from "../models/job.js"
import mongoose from 'mongoose';

export const employerGetAllApply=async(req,res,next)=>{
    try {
        const {isRecruiter}=req.user;
        if(isRecruiter==false){
            return next( 
                createError(400,
                    "job seeker is not allowed to access this resources")
                );
        }
        const {_id}=req.user;
        const apply=await Apply.find({"employerId.user":_id})
        res.status(200).json({
            success:true,
            apply
        })

    }
    catch (e) {
        next(e);
        
    }
}
export const JobSeekerGetAllApply=async(req,res,next)=>{
    // res.send("hello");
    try {
        const {isRecruiter}=req.user;
        if(isRecruiter){
            return next( 
                createError(400,"Recruiter are not allowed to access this resources")
                );
        }
        const {_id}=req.user;
        const apply=await Apply.find({"applicantId.user":_id})
        res.status(200).json({
            success:true,
            apply
        })

    }
    catch (e) {
        next(e);

    }
}

export const JobSeekerDeleteApply = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(createError(401, "Unauthorized access"));
    }

    const { isRecruiter } = req.user;
    if (isRecruiter) {
      return next(createError(400, "Recruiters are not allowed to access this resource"));
    }

    const { id } = req.params;
    // console.log("Application ID:", id);

    const apply = await Apply.findById(id);
    if (!apply) {
      return next(createError(404, "Oops, application not found"));
    }

    await apply.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      apply,
    });
  } catch (error) {
    next(error);
  }
};


export const postApply = async (req, res, next) => {
  try {
    const { isRecruiter } = req.user;
    if (isRecruiter) {
      return next(createError(400, "Recruiters are not allowed to access this resource"));
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return next(createError(400, "Resume file required"));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
      return next(createError(400, "Invalid file format. Please upload your resume in PNG, JPG, or WEBP format."));
    }

    const cloudinaryRes = await cloudinary.uploader.upload(resume.tempFilePath);
    if (!cloudinaryRes || cloudinaryRes.error) {
      console.error("Cloudinary Error", cloudinaryRes.error || "unknown Cloudinary error");
      return next(createError(400, "Failed to upload resume"));
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantId = {
      user: req.user._id.toString(),
      isRecruiter: false
    };

    if (!jobId) {
      return next(createError(400, "Job not found"));
    }

    // Validate jobId as ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return next(createError(400, "Invalid jobId format"));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(createError(404, "Job not found"));
    }

    const employerId = {
      user: jobDetails.postedBy,
      isRecruiter: true
    };

    if (!name || !coverLetter || !phone || !address || !resume) {
      return next(createError(400, "Please fill all fields"));
    }

    const application = await Apply.create({
      name,
      email,
      applicantId,
      employerId,
      coverLetter,
      phone,
      address,
      resume: {
        public_id: cloudinaryRes.public_id,
        url: cloudinaryRes.secure_url
      }
    });

    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application
    });
  } catch (error) {
    console.error("Error during application submission:", error); // Improved logging
    next(error);
  }
};
