const axios = require("axios");

const fetchJobs = async () => {

    try {

        const response = await axios.get(
            "https://www.arbeitnow.com/api/job-board-api"
        );

        console.log(
            "API JOBS FETCHED:",
            response.data.data.length
        );

        return response.data.data || [];

    } catch (error) {

        console.log(
            "Error fetching jobs:",
            error.message
        );

        return [];
    }
};

module.exports = fetchJobs;