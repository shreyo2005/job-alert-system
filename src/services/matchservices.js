const getMatchedJobs = (user, jobs) => {

    const matchedjobs = jobs.map(job => {

        let score = 0;

        const userskills = user.skills.map(skill =>
            skill.toLowerCase()
        );

        const jobskills = job.skillsrequired.map(skill =>
            skill.toLowerCase()
        );

        const matchedskills = jobskills.filter(skill =>
            userskills.includes(skill)
        );

        // skill score
        score = score + matchedskills.length * 10;

        // location score
        if (
            user.location &&
            job.location &&
            user.location.toLowerCase() ===
            job.location.toLowerCase()
        ) {
            score = score + 20;
        }

        // experience score
        if (
            user.experience >= job.requiredExperience
        ) {
            score = score + 15;
        }

        // salary score
        if (
            user.expectedSalary &&
            job.salary &&
            job.salary >= user.expectedSalary
        ) {
            score = score + 10;
        }

        // education score
        if (
            user.education &&
            job.education &&
            user.education.toLowerCase() ===
            job.education.toLowerCase()
        ) {
            score = score + 10;
        }

        return {
            ...job.toObject(),
            matchScore: score,
            matchedskills
        };

    });

    // remove low score jobs
    const filteredjobs = matchedjobs.filter(
        job => job.matchScore > 0
    );

    // sort descending
    filteredjobs.sort(
        (a, b) => b.matchScore - a.matchScore
    );

    return filteredjobs;
};

module.exports = getMatchedJobs;