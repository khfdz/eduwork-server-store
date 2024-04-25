import React, { useState } from 'react';
import '../styles/Hamburger.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../components/login";
import Profile from "../components/profile";

const Hamburger = ({ onClose }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
        setShowLogin(!showLogin);
    }

    const handleProfileClick = () => {
        setIsLoggedIn(true);
    }
    

    return (
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="hamburger-container">
                <div className="popup-card">
                    <button onClick={onClose} className="close-button">X</button>
                    <div className="profile-info">
                        {isLoggedIn ? (
                            
                            <Profile />
                            
                            
                        ) : (
                            showLogin ? (
                                <Login />
                            ) : (
                                <p className="not-logged-in">You are not logged in !</p>
                                
                            )
                        )}
                    </div>
                    <button onClick={handleLoginClick} className="btn btn-primary">Login</button>
                    <button onClick={handleProfileClick} className="btn btn-primary">Profile</button>
                </div>
            </div>
        </>
    );
}

export default Hamburger;
