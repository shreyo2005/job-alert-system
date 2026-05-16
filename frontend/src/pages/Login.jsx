import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", form);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
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
            Your skills,<br />
            your <em>perfect</em><br />
            match.
          </h1>
          <p className="auth-subline">
            We scan thousands of openings across every platform and surface only the ones that actually fit you — by skill, location, and experience.
          </p>
        </div>
        <div className="auth-stats">
          <div>
            <span className="auth-stat-val">12k+</span>
            <span className="auth-stat-label">Live jobs</span>
          </div>
          <div>
            <span className="auth-stat-val">94%</span>
            <span className="auth-stat-label">Match accuracy</span>
          </div>
          <div>
            <span className="auth-stat-val">8</span>
            <span className="auth-stat-label">Platforms</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap fade-up">
          <h2 className="auth-form-title">Welcome back</h2>
          <p className="auth-form-sub">Sign in to see your matched jobs</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <p className="switch-text">
            Don't have an account?{" "}
            <span className="switch-link" onClick={onSwitch}>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}