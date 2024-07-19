 import Job from '../models/job.js';
import { createError } from '../utils/error.js';

export const postJob=async(req,res,next)=>{
  const {isRecruiter}=req.user;
  if(!isRecruiter){
    return res.status(401).json({message:"You are not allowed to post Job."})
  }
  const postedBy=req.user._id;
  console.log(postedBy);
    const postJobData=new Job({
      ...req.body,
      postedBy
    });
    try {
        await postJobData.save();
        //  console.log(postJobData);
        res.status(201).json("data stored!!")
    } catch (err) {
        next(err);
        
    }
}


export const getJobs=async(req,res,next)=>{
    try{
        //res.send("hello")
         const jobs=await Job.find();
         res.status(200).json(jobs);
    }
    catch{(err)=>{
        next(err);
    }

    }
}
export const getJobsByemail=async (req, res, next) => {
    try {
      const email = req.params.email;
      console.log(email);
      const jobs = await Job.find({ postedBy: email });
      
  
      if (!jobs.length) {
        return res.status(404).json({ message: 'No jobs found for this email.' });
      }
  
    //   res.status(200).json(jobs);
      res.status(200).json({ message: 'Jobs retrieved successfully.', jobs });
    } catch (err) {
      res.status(500).json({ message: 'Server error, please try again later.' });
      next(err);
    }
  };
  export const getMyJobs = async (req, res, next) => {
    try {
        const { isRecruiter } = req.user;
        const id = req.user._id.toString();
        
        if (!isRecruiter) {
            return res.status(401).json({ message: "You are not allowed to access this Page Only recruiter can access" });
        }
        
        const jobs = await Job.find({ postedBy: id }); // Retrieve jobs posted by the recruiter
        
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this recruiter." });
        }

        res.status(200).json({
          success: true,
          jobs,
        });
    } catch (err) {
        next(err); // Pass any caught errors to the error handling middleware
    }
};


export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(createError(404, "Invalid Id/CastError"));
  }
};



export const deleteJobs = async (req, res) => {
    try {
      const { id } = req.params;
      const job = await Job.findByIdAndDelete(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json({ acknowledged: true });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  // error in this route
  export const updateJobs=async(req,res,next)=>{
    res.send("hello")
    // const {isRecruiter}=req.user;
    // if(!isRecruiter){
    //   return next(new createError(400,"job seeker are not allowed to access this feature"))

    // }
    // const id=req.params;
    // let job=await Job.findById(id);
    // if(!job){
    //   return next(new createError(404,"job not found"))

    // }
    // job =await Job.findByIdAndUpdate(id,req.body,{
    //   new:true,
    //   runValidators:true,
    //   useFindAndModify:false,

    // });
    // res.status(200).json({
    //   success:true,
    //   message:"job updated SuccessFully",
    //   job,
    // })
  }