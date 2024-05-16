import React, { useState, useEffect } from 'react';
import '../styles/Hamburger.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/login';
import Register from '../components/register';
import Profile from '../components/profile';

const Hamburger = ({ onClose }) => { 
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showProfile, setShowProfile] = useState(true); // Mengatur default showProfile menjadi true
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowProfile(false);
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
        setShowProfile(false);
    };

    const handleProfileClick = () => {
        setShowProfile(true);
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleLogoutClick = async () => {
        try {
            // Kirim permintaan POST ke endpoint logout
            const response = await fetch('http://localhost:3002/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (response.ok) {
                // Hapus token dari localStorage
                localStorage.removeItem('token');
                setIsLoggedIn(false); // Set isLoggedIn menjadi false setelah logout berhasil
                setShowProfile(false); // Sembunyikan Profile setelah logout
                console.log('Logout success');
                // Lakukan sesuatu setelah logout berhasil
            } else {
                console.error('Logout failed:', await response.json());
                // Lakukan sesuatu jika logout gagal
            }
        } catch (error) {
            console.error('Failed to logout:', error);
            // Lakukan sesuatu jika terjadi kesalahan saat melakukan logout
        }
    };

    useEffect(() => {
        // Set showProfile ke true saat hamburger pertama kali muncul
        setShowProfile(true);
    }, []);

    return (
        <>
            <div className="background-overlay" onClick={onClose}></div>
            <div className="hamburger-container">
                <div className="popup-card">
                    <button onClick={onClose} className="close-button">X</button>
                    {/* <div className="profile-info"> */}
                        {showLogin && <Login />}
                        {showRegister && <Register />}
                        {showProfile && <Profile />}
                    {/* </div> */}
                </div>
            </div>
        </>
    );
}

export default Hamburger;
