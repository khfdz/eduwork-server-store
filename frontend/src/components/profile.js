import React, { useState, useEffect } from 'react';
import Address from '../components/address'; // Import Address component
import AddAddress from '../components/addAddress'; // Import AddAddress component
import '../styles/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/login'; // Import Login component
import Register from '../components/register'; // Import Register component
import EditAddress from '../components/editAddress';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [showLogin, setShowLogin] = useState(false); // State untuk menampilkan Login
    const [showRegister, setShowRegister] = useState(false); // State untuk menampilkan Register
    const [showAddAddress, setShowAddAddress] = useState(false); // State untuk menampilkan Add Address
    const [showProfile, setShowProfile] = useState(true); // State untuk menampilkan Profile
    const [showEditAddress, setShowEditAddress] = useState(false); // State untuk menampilkan Edit Address

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData({
                        fullname: data.full_name,
                        email: data.email,
                        role: data.role,
                        _id: data._id 
                    });
                } else {
                    console.error('Failed to fetch user data:', data);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLoginClick = () => {
        setShowLogin(true); // Menampilkan Login component saat tombol login diklik
    };

    const handleRegisterClick = () => {
        setShowRegister(true); // Menampilkan Register component saat tombol register diklik
    };

    const handleAddAddressClick = () => {
        setShowProfile(false); // Sembunyikan Profile component saat tombol Add Address diklik
        setShowAddAddress(true); // Tampilkan AddAddress component saat tombol Add Address diklik
    };

    const handleEditAddressClick = () => {
        setShowProfile(false); // Sembunyikan Profile component saat tombol Edit Address diklik
        setShowEditAddress(true); // Tampilkan EditAddress component saat tombol Edit Address diklik
    };

    const handleLogoutClick = async () => {
        try {
            const response = await fetch('http://localhost:3002/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                localStorage.removeItem('token'); // Hapus token dari local storage
                setUserData(null); // Set userData menjadi null setelah logout berhasil
            } else {
                console.error('Failed to logout:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <div className="profile-container">
            {/* Render Login component jika showLogin bernilai true */}
            {showLogin && <Login />}
            {/* Render Register component jika showRegister bernilai true */}
            {showRegister && <Register />}
            
            {/* Render Profile component jika showProfile bernilai true */}
            {showProfile && userData?._id && (
                <div className="loggedInContainer">
                    <div className="profile-info">
                        <h2 className='title'>Profile</h2>
                        <div className="profile-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{userData.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>{userData.role}</td>
                                    </tr>
                                    <tr>
                                        <th>ID</th>
                                        <td>{userData._id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Address userId={userData._id} />
                        <button onClick={handleAddAddressClick} className='btn AddAddress' >Add Address</button>
                        <button onClick={handleEditAddressClick} className='btn EditAddress' >Edit Address</button>
                        <button onClick={handleLogoutClick} className="btn Logout">Logout</button>
                    </div>
                </div>
            )}
            
            {/* Render AddAddress component jika showAddAddress bernilai true */}
            {showAddAddress && <AddAddress userId={userData._id} fullName={userData.fullname} />}

            {showEditAddress && <EditAddress userId={userData._id} fullName={userData.fullname}/>}

            
            {/* Jika userData._id kosong atau null, render tombol Login dan Register */}
            {!userData?._id && !showLogin && !showRegister && (
                <div className="notLoggedInContainer">
                    <div className="profile-info-belum-login">
                        <div className="not-logged-in">
                            <div className="box-not-logged-in">
                                <p>Sorry, you are not logged in.</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLoginClick} className="btn btn-primary">Login</button>
                    <button onClick={handleRegisterClick} className="btn btn-primary">Register</button>
                </div>
            )}
        </div>
    );
}

export default Profile;
