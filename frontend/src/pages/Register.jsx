import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ALL_SKILLS = [
  "javascript","typescript","react","nextjs","node","express",
  "mongodb","sql","python","java","docker","kubernetes",
  "aws","git","redis","firebase","html","css","nestjs","graphql",
  "django","flask","spring","go","rust","postgresql","mysql"
];

export default function Register({ onSwitch }) {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    skills: [], location: "",
    experience: "", education: "", expectedSalary: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const goNext = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.skills.length === 0) {
      setError("Pick at least one skill.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        ...form,
        experience: Number(form.experience) || 0,
        expectedSalary: Number(form.expectedSalary) || 0,
      });
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">
            <div className="auth-logo-mark">🎯</div>
            <span className="auth-logo-text">JobMatch</span>
          </div>
          <h1 className="auth-headline">
            Tell us<br />
            who you <em>are.</em><br />
            We'll find<br />
            your role.
          </h1>
          <p className="auth-subline">
            Fill in your skills and location once. We do the rest — scanning every major job platform and ranking matches just for you.
          </p>
        </div>
        <div className="auth-stats">
          <div>
            <span className="auth-stat-val">2 min</span>
            <span className="auth-stat-label">To set up</span>
          </div>
          <div>
            <span className="auth-stat-val">∞</span>
            <span className="auth-stat-label">Matches</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap fade-up">
          <h2 className="auth-form-title">
            {step === 1 ? "Create your account" : "Build your profile"}
          </h2>
          <p className="auth-form-sub">
            {step === 1 ? "Step 1 of 2 — account details" : "Step 2 of 2 — skills & preferences"}
          </p>

          <div className="steps-row">
            <div className="step-item">
              <div className={`step-circle ${step === 1 ? "active" : "done"}`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={`step-label ${step === 1 ? "active" : ""}`}>Account</span>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
              <span className={`step-label ${step === 2 ? "active" : ""}`}>Profile</span>
            </div>
          </div>

          {step === 1 && (
            <div>
              <div className="field">
                <label>Full name</label>
                <input name="name" type="text" placeholder="Shreya" value={form.name} onChange={handleChange} />
              </div>
              <div className="field">
                <label>Email address</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="field">
                <label>Password</label>
                <input name="password" type="password" placeholder="Min 8 characters" value={form.password} onChange={handleChange} />
              </div>
              {error && <div className="error-msg">{error}</div>}
              <button className="btn-primary" onClick={goNext}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="fields-row">
                <div className="field">
                  <label>Location</label>
                  <input name="location" type="text" placeholder="Bangalore" value={form.location} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Years of exp.</label>
                  <input name="experience" type="number" placeholder="0" min="0" value={form.experience} onChange={handleChange} />
                </div>
              </div>

              <div className="field">
                <label>Education</label>
                <input name="education" type="text" placeholder="B.Tech Computer Science" value={form.education} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Expected salary <span>(₹/year, optional)</span></label>
                <input name="expectedSalary" type="number" placeholder="600000" value={form.expectedSalary} onChange={handleChange} />
              </div>

              <div className="field">
                <label>Your skills <span>— select all that apply</span></label>
                <div className="skills-grid">
                  {ALL_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`skill-toggle ${form.skills.includes(skill) ? "selected" : ""}`}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="error-msg">{error}</div>}

              <div className="btn-row">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? "Creating…" : "Create account →"}
                </button>
              </div>
            </form>
          )}

          <p className="switch-text">
            Already have an account?{" "}
            <span className="switch-link" onClick={onSwitch}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}