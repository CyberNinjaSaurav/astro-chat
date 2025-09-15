import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session/token
        localStorage.removeItem('authToken');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1>Astro Chat</h1>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;