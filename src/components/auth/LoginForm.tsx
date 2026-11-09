"use client";

import { useState } from "react";
import Link from "next/link";

export function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: "560px" }}>
      {!submitted ? (
        <form className="form-card rv" id="loginForm" onSubmit={handleSubmit} noValidate={false}>
          <div className="f-grid">
            <div className="f-field full">
              <label htmlFor="liEmail">Work email</label>
              <input
                id="liEmail"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <label htmlFor="liPass">Password</label>
              <input
                id="liPass"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="f-field full">
              <button className="btn btn-navy" type="submit">
                Log in
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="form-card rv" id="loginDone" aria-live="polite">
          <div className="form-done">
            <h2 className="h3">Welcome back.</h2>
            <p>
              This redesign mock does not sign you in. In the live product, your verified
              hardware-bound FIDO2 key or biometric passkey completes sign-in here.
            </p>
            <Link className="btn btn-ghost-l" href="/">
              Back to home
            </Link>
          </div>
        </div>
      )}

      <p style={{ marginTop: "24px", fontSize: "16px", color: "var(--gray)" }}>
        New to XSignOn?{" "}
        <Link className="link-arrow" href="/register">
          Create an account{" "}
          <span className="arr" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </p>
    </div>
  );
}
