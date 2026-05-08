const User = require('../models/user');
const Job = require('../models/job');

const getMatchedJobs = require('../services/matchservices');
const fetchJobs = require("../services/fetchJobs");
const normalizeJob = require("../services/jobNormalizer");

exports.matchedjobs = async (req, res) => {

    try {

        const { userid } = req.params;

        // fetch user
        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        // fetch jobs from mongodb
        const jobs = await Job.find();

        console.log("DB JOBS:", jobs.length);

        // fetch jobs from API
        const apijobs = await fetchJobs();

        console.log("API JOBS:", apijobs.length);

        // normalize API jobs
        const normalizedApiJobs = apijobs.map(normalizeJob);

        // merge both
        const alljobs = [
            ...jobs,
            ...normalizedApiJobs
        ];

        console.log("TOTAL JOBS:", alljobs.length);

        // match jobs
        const matchedjobs = getMatchedJobs(
            user,
            alljobs
        );

        return res.status(200).json({
            success: true,
            totalMatches: matchedjobs.length,
            matchedjobs
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
};
