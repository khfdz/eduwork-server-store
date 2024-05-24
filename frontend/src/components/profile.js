import React, { useState, useEffect, useContext } from 'react';
import Address from '../components/address'; 
import AddAddress from '../components/addAddress'; 
import EditAddress from '../components/editAddress';
import OrderHistory from './orderHistory'; 
import '../styles/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/login';
import Register from '../components/register'; 
import { CartContext  } from '../../src/context/CartContext';


const Profile = () => {
    const {userData, setUserData,handleLogoutClick} = useContext(CartContext);
    const [showLogin, setShowLogin] = useState(false); 
    const [showRegister, setShowRegister] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [showEditAddress, setShowEditAddress] = useState(false); 
    const [showOrderHistory, setShowOrderHistory] = useState(false); 

    useEffect(() => {
    }, []);

    const handleLoginClick = () => {
        setShowLogin(true); 
    };

    const handleRegisterClick = () => {
        setShowRegister(true); 
    };

    const handleAddAddressClick = () => {
        setShowProfile(false); 
        setShowAddAddress(true); 
    };

    const handleEditAddressClick = () => {
        setShowProfile(false); 
        setShowEditAddress(true); 
    };

    const handleShowOrderHistoryClick = () => {
        setShowProfile(false);
        setShowOrderHistory(true); 
    };

    return (
        <div className="profile-container">
            {showLogin && <Login />}
            {showRegister && <Register />}
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
                        <button onClick={handleShowOrderHistoryClick} className='btn OrderHistory'>Order History</button>
                        <button onClick={handleLogoutClick} className="btn Logout">Logout</button>
                    </div>
                </div>
            )}
        
            {showAddAddress && <AddAddress userId={userData._id} fullName={userData.fullname} />}
            {showEditAddress && <EditAddress userId={userData._id} fullName={userData.fullname}/>}
            {showOrderHistory && <OrderHistory />}
            
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
