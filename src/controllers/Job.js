const Job = require("../models/job");  // ✅ only one import

// CREATE JOB
const createjob = async (req, res) => {
    try {
        const { name, company, skillsrequired, description } = req.body;

        const newJob = new Job({
            name,
            company,
            skillsrequired,
            description
        });

        await newJob.save();

        res.status(201).json({
            message: "job saved successfully",
            data: newJob
        });

    } catch (error) {
        res.status(500).json({
            message: "error trying to create job",
            error: error.message
        });
    }
};

// GET ALL JOBS
const getjobs = async (req, res) => {
    try {
        const jobs = await Job.find(); // removed status filter (optional)

        res.status(200).json({
            count: jobs.length,
            data: jobs
        });

    } catch (error) {
        res.status(500).json({
            message: "error trying to get the job",
            error: error.message
        });
    }
};

// GET JOB BY ID
const getjobsbyid = async (req, res) => {
    try {
        const foundJob = await Job.findById(req.params.id);

        if (!foundJob) {
            return res.status(404).json({
                message: "job not found"
            });
        }

        res.status(200).json(foundJob);

    } catch (error) {
        res.status(500).json({
            message: "error fetching job",
            error: error.message
        });
    }
};

module.exports = {
    createjob,
    getjobs,
    getjobsbyid
};