import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/job/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data.matchedjobs || []);
      } catch {
        setError("Could not load matched jobs. Is the server running?");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [token]);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const topScore = jobs[0]?.matchScore ?? 0;

  return (
    <div className="dash-page">
      <nav className="dash-nav">
        <div className="nav-logo">
          <div className="nav-logo-mark">🎯</div>
          <span className="nav-logo-text">JobMatch</span>
        </div>

        <div className="nav-tabs">
          <button
            className={`nav-tab ${view === "dashboard" ? "active" : ""}`}
            onClick={() => setView("dashboard")}
          >
            Overview
          </button>
          <button
            className={`nav-tab ${view === "jobs" ? "active" : ""}`}
            onClick={() => setView("jobs")}
          >
            Matched Jobs
            {jobs.length > 0 && (
              <span className="nav-badge">{jobs.length}</span>
            )}
          </button>
        </div>

        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar">{initials}</div>
            {user?.name?.split(" ")[0]}
          </div>
          <button className="btn-logout" onClick={logout}>Sign out</button>
        </div>
      </nav>

      <div className="dash-body">
        {view === "dashboard" && (
          <div className="fade-up">
            <div className="profile-hero">
              <div className="profile-hero-left">
                <div className="profile-avatar-lg">{initials}</div>
                <div>
                  <div className="profile-hero-name">{user?.name}</div>
                  <div className="profile-hero-email">{user?.email}</div>
                </div>
              </div>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-val">{loading ? "—" : jobs.length}</span>
                  <span className="profile-stat-label">Matches</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-val">{loading ? "—" : topScore}</span>
                  <span className="profile-stat-label">Top score</span>
                </div>
                <div className="profile-stat">
                  <span className="profile-stat-val">{user?.skills?.length ?? 0}</span>
                  <span className="profile-stat-label">Skills</span>
                </div>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-title">Profile details</div>
                <div className="info-row">
                  <span className="info-label">Location</span>
                  <span className="info-val">{user?.location || "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Experience</span>
                  <span className="info-val">{user?.experience != null ? `${user.experience} yrs` : "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Education</span>
                  <span className="info-val">{user?.education || "—"}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Expected salary</span>
                  <span className="info-val">
                    {user?.expectedSalary ? `₹${Number(user.expectedSalary).toLocaleString("en-IN")}` : "—"}
                  </span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-title">Your skills</div>
                <div className="skills-wrap">
                  {(user?.skills || []).map((s) => (
                    <span key={s} className="skill-pill">{s}</span>
                  ))}
                  {(!user?.skills || user.skills.length === 0) && (
                    <span style={{ fontSize: "13px", color: "var(--ink-3)" }}>No skills added</span>
                  )}
                </div>
              </div>
            </div>

            <button className="view-jobs-cta" onClick={() => setView("jobs")}>
              View your {loading ? "…" : jobs.length} matched jobs →
            </button>
          </div>
        )}

        {view === "jobs" && (
          <div className="fade-up">
            <div className="jobs-header">
              <div>
                <div className="jobs-title">Matched Jobs</div>
                <div className="jobs-sub">Ranked by how well they fit your profile</div>
              </div>
              {!loading && (
                <span className="jobs-count">{jobs.length} matches found</span>
              )}
            </div>

            {loading && (
              <div className="state-box">
                <div className="state-icon">🔍</div>
                <div className="state-title">Finding your matches</div>
                <div className="state-sub">Scanning jobs across all platforms…</div>
                <div className="loading-dots">
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                  <div className="loading-dot" />
                </div>
              </div>
            )}

            {error && (
              <div className="state-box">
                <div className="state-icon">⚠️</div>
                <div className="state-title">Something went wrong</div>
                <div className="state-sub">{error}</div>
              </div>
            )}

            {!loading && !error && jobs.length === 0 && (
              <div className="state-box">
                <div className="state-icon">📭</div>
                <div className="state-title">No matches yet</div>
                <div className="state-sub">Try adding more skills to your profile, or check back as new jobs are listed.</div>
              </div>
            )}

            <div className="jobs-grid">
              {jobs.map((job, i) => (
                <JobCard key={job._id || i} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}