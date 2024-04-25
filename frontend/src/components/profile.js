import React, { useState, useEffect } from 'react';
import Address from '../components/address';

const Profile = () => {
    const [userData, setUserData] = useState(null);

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
                        _id: data._id // tambahkan _id ke userData
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

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {userData && (
                <div className="profile-details">
                    <p><strong>Name:</strong> {userData.fullname}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>ID:</strong> {userData._id}</p> {/* tambahkan ID di sini */}
                </div>
            )}
            <hr></hr>
            <Address userId={userData ? userData._id : null} /> {/* kirimkan _id ke komponen Address */}
        </div>
    );
}

export default Profile;
