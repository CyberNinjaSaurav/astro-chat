import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// You'll create apiService.js in the next step
// import { loginUser, loginWithGoogle } from '../api/apiService'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await loginUser({ email, password });
            // localStorage.setItem('authToken', response.data.token);
            // navigate('/'); // Redirect to chat page on success
            console.log("Standard login clicked");
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            // const response = await loginWithGoogle(credentialResponse);
            // localStorage.setItem('authToken', response.data.token);
            // navigate('/');
            console.log("Google Login Success:", credentialResponse);
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com">
            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                <div className="google-login">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log('Login Failed')}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginPage;