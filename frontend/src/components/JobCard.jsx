export default function JobCard({ job }) {
  const companyInitial = (job.company || job.name || "?")[0].toUpperCase();
  const scorePercent = Math.min((job.matchScore / 60) * 100, 100);
  const matchedSkills = job.matchedskills || [];

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div className="job-company-logo">{companyInitial}</div>
        <div className="job-score-badge">
          <span className="job-score-val">{job.matchScore}</span>
          <span className="job-score-label">Match score</span>
        </div>
      </div>

      <div className="score-bar-wrap">
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${scorePercent}%` }} />
        </div>
      </div>

      <div className="job-title">{job.name}</div>
      <div className="job-company">{job.company}</div>

      <div className="job-meta">
        {job.location && (
          <div className="job-meta-item">📍 {job.location}</div>
        )}
        {job.type && (
          <div className="job-meta-item">💼 {job.type}</div>
        )}
        {job.source && (
          <div className="job-meta-item">🔗 {job.source}</div>
        )}
      </div>

      {job.description && (
        <div className="job-desc">{job.description}</div>
      )}

      {matchedSkills.length > 0 && (
        <div className="job-skills">
          {matchedSkills.map((skill) => (
            <span key={skill} className="job-skill-match">✓ {skill}</span>
          ))}
        </div>
      )}

      <div className="job-salary">
        <span className="job-salary-label">Salary</span>
        <span>{job.salary ? `₹${Number(job.salary).toLocaleString("en-IN")}` : "Not specified"}</span>
      </div>
    </div>
  );
}