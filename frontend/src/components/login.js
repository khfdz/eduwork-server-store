import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './register'; // Import Register component
import Profile from './profile'; // Import Profile component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showProfile, setShowProfile] = useState(false); // State untuk menampilkan Profile

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting login form...'); // Console log saat tombol login diklik
            const response = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login success:', data);
                console.log('Token:', data.token);
                setLoginError(null);
                setUserId(data.user._id);
                setIsLoggedIn(true);
                setUserName(data.user.full_name);
                window.location.reload()
                // Tampilkan Profile setelah 3 detik
                setTimeout(() => {
                    setShowProfile(true);
                }, 3000);
            } else {
                console.error('Login failed:', data);
                setLoginError(data.message);
                setUserId(null);
                setIsLoggedIn(false);
                setUserName('');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Failed to login. Please try again.');
            setUserId(null);
            setIsLoggedIn(false);
            setUserName('');
        }
    }

    const handleRegisterClick = () => {
        setShowRegister(true); // Menampilkan Register component saat tombol register diklik
    }
    
    return (
        <div className="login-page">
            {!showRegister && !showProfile && (
                <div className="login-container">
                    <div className="login-box">
                        <h2 className='login-title'>Login</h2>
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                        {isLoggedIn ? (
                            <div>
                                <p>You have successfully logged in!</p>
                                <p>Welcome, {userName}!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    {/* <label htmlFor="email">Email</label> */}
                                    <input
                                        type="email"
                                        className="formLogin "
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password</label> */}
                                    <input
                                        type="password"
                                        className="formLogin"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="login-btn">Login</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
            {!showRegister && !showProfile && <button onClick={handleRegisterClick} className='btn btn-primary'>Register</button>}
            {showRegister && <Register />}
            {showProfile && <Profile />}
        </div>
    );
}

export default Login;
