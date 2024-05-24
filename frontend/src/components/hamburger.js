import React, { useState, useEffect } from 'react';
import '../styles/Hamburger.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../components/profile';

const Hamburger = ({ onClose }) => { 
    const [showProfile, setShowProfile] = useState(true);

    useEffect(() => {
        setShowProfile(true);
    }, []);

    return (
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="hamburger-container">
                <div className="popup-card">
                    <button onClick={onClose} className="close-button">X</button>
                    {showProfile && <Profile />}
                </div>
            </div>
        </>
    );
}

export default Hamburger;
