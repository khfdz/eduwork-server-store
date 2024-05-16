import React, { useState } from 'react';
import '../styles/register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login'; // Import Login component

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false); // State untuk menampilkan Login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ full_name: fullName, email, password, role: 'user' })
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Registration success:', data);
            } else {
                console.error('Registration failed:', data);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    const handleLoginClick = () => {
        setShowLogin(true); // Menampilkan Login component saat tombol login diklik
    }

    return (
        <div className="register-page">
            {!showLogin && (
                <div className="register-container">
                    <div className="register-box">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="formRegister"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="formRegister"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="formRegister"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btnRegister">Register</button>
                        </form>
                    </div>
                </div>
            )}
            {!showLogin && <button onClick={handleLoginClick} className='btn btn-primary'>Login</button>}
            {showLogin && <Login />}
        </div>
    );
}

export default Register;
