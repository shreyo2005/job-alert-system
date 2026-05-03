//routes for the jobs
const express=require("express");
const router=express.Router();

const{
    createjob,
    getjobs,
    getjobsbyid

}=require("../controllers/job")

router.post("/job",createjob)
router.get("/jobs",getjobs)
router.get("/job/:id",getjobsbyid)

module.exports=router;
