const normalizeSkill = (skill) => {

    return skill
        .toLowerCase()
        .replace(".js", "")
        .replace("nodejs", "node")
        .replace("reactjs", "react")
        .replace("mongo db", "mongodb")
        .replace("express js", "express")
        .replace("next js", "nextjs")
        .trim();
};

const getMatchedJobs = (user, jobs) => {

    const matchedjobs = jobs.map(job => {

        let score = 0;

        // normalize user skills
        const userskills = (user.skills || []).map(skill =>
            normalizeSkill(skill)
        );

        // normalize job skills
        const jobskills = (job.skillsrequired || []).map(skill =>
            normalizeSkill(skill)
        );

        // direct skill matching
        const matchedskills = jobskills.filter(skill =>
            userskills.includes(skill)
        );

        // score from matched skills
        score += matchedskills.length * 10;

        // fallback matching from description
        if (
            matchedskills.length === 0 &&
            job.description
        ) {

            userskills.forEach(skill => {

                if (
                    job.description
                        .toLowerCase()
                        .includes(skill)
                ) {

                    matchedskills.push(skill);

                    score += 5;
                }
            });
        }

        // location score
        if (
            user.location &&
            job.location &&
            (
                user.location
                    .toLowerCase()
                    .includes(job.location.toLowerCase()) ||

                job.location
                    .toLowerCase()
                    .includes(user.location.toLowerCase())
            )
        ) {

            score += 20;
        }

        // DEBUG LOGS
        console.log("JOB:", job.name);
        console.log("USER SKILLS:", userskills);
        console.log("JOB SKILLS:", jobskills);
        console.log("MATCHED:", matchedskills);
        console.log("SCORE:", score);
        console.log("--------------------");

        return {
            ...(job.toObject ? job.toObject() : job),
            matchScore: score,
            matchedskills
        };

    });

    return matchedjobs
        .filter(job => job.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = getMatchedJobs;