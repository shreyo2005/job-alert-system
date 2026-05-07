const User = require('../models/user');
const Job = require('../models/job');
const getMatchedJobs = require('../services/matchservices');

exports.matchedjobs= async(req,res)=>{
    try{
        const {userid}=req.params;
        const user=await User.findById(userid);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
            
        }

        //fetch all jobs

        const jobs=await Job.find();
        const matchedjobs=getMatchedJobs(user,jobs);
        return res.status (200).json({
            success:true,
            totalMatches:matchedjobs.length,
            matchedjobs
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"server error"
        });
    }


}
