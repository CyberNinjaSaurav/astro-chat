import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/apiService";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupUser({ email, password });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.error || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT PANEL */}
      <div className="auth-left">
        <h1 className="brand">🚀 AstroChat</h1>
        <p className="subtitle">Create your AI universe</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD WITH EYE */}
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Create account</button>
        </form>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in</span>
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <h2>Join the Astro AI</h2>
        <p>Chat · Images · Video · Knowledge</p>
        <div className="astro-orbit"></div>
      </div>
    </div>
  );
};

export default SignupPage;
