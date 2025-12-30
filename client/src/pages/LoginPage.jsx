import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { loginUser, googleLogin } from "../api/apiService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/chat");
  };

  const handleGoogleSuccess = async (cred) => {
    const res = await googleLogin(cred.credential);
    localStorage.setItem("token", res.data.token);
    navigate("/chat");
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT */}
      <div className="auth-left">
        <h1 className="brand">🚀 AstroChat</h1>
        <p className="subtitle">Explore AI beyond the stars</p>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Login Failed")}
        />

        <div className="divider">OR</div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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

          <button type="submit">Log in</button>
        </form>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <h2>400K+ users · AI powered</h2>
        <p>Chat · Image · Video · Knowledge</p>
        <div className="astro-orbit"></div>
      </div>
    </div>
  );
};

export default LoginPage;
