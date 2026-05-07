function JobCard({ job }) {

    return (

        <div className="job-card">

            <h2>{job.name}</h2>

            <h3>{job.company}</h3>

            <p>
                <strong>Description:</strong>
                {" "}
                {job.description}
            </p>

            <p>
                <strong>Location:</strong>
                {" "}
                {job.location}
            </p>

            <p>
                <strong>Salary:</strong>
                {" "}
                ₹{job.salary}
            </p>

            <p>
                <strong>Match Score:</strong>
                {" "}
                {job.matchScore}
            </p>

            <div>

                <strong>Matched Skills:</strong>

                <div className="skills-container">

                    {job.matchedskills.map(skill => (

                        <span
                            className="skill-badge"
                            key={skill}
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default JobCard;