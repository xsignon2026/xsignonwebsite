"use client";

import { useState } from "react";
import Link from "next/link";

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company || !password) return;
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: "560px" }}>
      {!submitted ? (
        <form className="form-card rv" id="registerForm" onSubmit={handleSubmit} noValidate={false}>
          <div className="f-grid">
            <div className="f-field full">
              <label htmlFor="rgName">Name</label>
              <input
                id="rgName"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <label htmlFor="rgEmail">Work email</label>
              <input
                id="rgEmail"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <label htmlFor="rgCompany">Company</label>
              <input
                id="rgCompany"
                type="text"
                autoComplete="organization"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <label htmlFor="rgPass">Create a password</label>
              <input
                id="rgPass"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <button className="btn btn-navy" type="submit">
                Create account
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="form-card rv" id="registerDone" aria-live="polite">
          <div className="form-done">
            <h2 className="h3">Registration initiated.</h2>
            <p>
              Thank you for registering. An onboarding link has been dispatched to your corporate
              email. In the live deployment, your hardware key will be bound during initial setup.
            </p>
            <Link className="btn btn-ghost-l" href="/">
              Back to home
            </Link>
          </div>
        </div>
      )}

      <p style={{ marginTop: "24px", fontSize: "16px", color: "var(--gray)" }}>
        Already have an account?{" "}
        <Link className="link-arrow" href="/login">
          Log in{" "}
          <span className="arr" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </p>
    </div>
  );
}
