const extractSkills = (text) => {

    const techskills = [
        "node",
        "express",
        "mongodb",
        "react",
        "javascript",
        "typescript",
        "python",
        "java",
        "docker",
        "kubernetes",
        "aws",
        "sql",
        "redis",
        "nextjs",
        "nestjs",
        "html",
        "css",
        "firebase",
        "git"
    ];

    const foundskills = [];

    techskills.forEach(skill => {

        if (
            text &&
            text.toLowerCase().includes(skill)
        ) {
            foundskills.push(skill);
        }
    });

    return foundskills;
};


// REMOVE HTML TAGS
const cleanHTML = (html) => {

    if (!html) return "";

    return html
        .replace(/<[^>]*>/g, " ") // remove html tags
        .replace(/\s+/g, " ") // remove extra spaces
        .trim();
};


const normalizeJob = (job) => {

    const rawDescription =
        job.description ||
        job.snippet ||
        "";

    // cleaned description
    const description = cleanHTML(rawDescription);
    console.log(description);

    return {

        // title
        name: job.title || job.name || "",

        // company
        company:
            job.company_name ||
            job.company ||
            "",

        // location
        location:
            job.location ||
            job.l ||
            "Remote",

        // cleaned description
        description,

        // extracted tech skills
        skillsrequired:
            extractSkills(description),

        // optional fields
        salary:
            job.salary || 0,

        requiredExperience:
            job.requiredExperience || 0,

        education:
            job.education || "",

        // keep original job
        raw: job
    };
};


module.exports = normalizeJob;