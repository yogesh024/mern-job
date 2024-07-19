import express from "express";
import { postJob ,getJobs,getJobsByemail,getMyJobs,deleteJobs, updateJobs,getSingleJob} from "../controllers/jobController.js";
import { isAuthroized } from "../utils/verifyToken.js";

const router = express.Router();

router.use(express.json());

router.post('/postjobs',isAuthroized, postJob);
router.get('/getMyjob',isAuthroized,getMyJobs);

router.get('/all-jobs',getJobs);
// router.get('/my-jobs',getJobs);
router.post('/:email',getJobsByemail);

router.delete('/:id',isAuthroized,deleteJobs);
router.get('/:id',isAuthroized,getSingleJob);

// error in updating do it
router.put('update/:id',updateJobs);

export default router;
