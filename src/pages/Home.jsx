
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/home.css'; // Assuming you have a CSS file for styling


const Home = () => {
    // Simulating user data fetching, replace with actual logic
    const [userData, setUserData] = useState({
        name: 'Prabhat',
        email: 'prabhat@example.com',
    });

    const navigate = useNavigate();

    // Navigate to different pages
    const goToCreatePage = () => {
        navigate('/create');
    };

    const goToEditPage = () => {
        navigate('/edit');
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const goToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div className="home-container">
            <h1>Welcome to Real-Time Collaboration App</h1>

            <div className="user-info">
                <h2>User Data</h2>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
            </div>

            <div className="button-container">
                <button onClick={goToCreatePage} className="btn create-btn">
                    Create Page
                </button>
                <button onClick={goToEditPage} className="btn edit-btn">
                    Edit Page
                </button>
            </div>

            <div className="auth-buttons">
                <button onClick={goToLoginPage} className="btn login-btn">
                    Login
                </button>
                <button onClick={goToRegisterPage} className="btn register-btn">
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;