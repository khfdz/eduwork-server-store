import React, { useState, useEffect } from 'react';
import '../styles/editAddress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './profile';

const EditAddress = ({ userId }) => {
    const [addresses, setAddresses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ShowEditAddress, setShowEditAddress] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/delivery-addresses?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setAddresses(data);
                } else {
                    console.error('Failed to fetch address data:', data);
                }
            } catch (error) {
                console.error('Failed to fetch address data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedAddresses = [...addresses];
        updatedAddresses[currentIndex][name] = value;
        setAddresses(updatedAddresses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3002/api/delivery-addresses/${addresses[currentIndex]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(addresses[currentIndex])
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Address updated successfully:', data);
                // Update addresses state after successful update
                setAddresses(prevAddresses => {
                    const updatedAddresses = [...prevAddresses];
                    updatedAddresses[currentIndex] = data; // Update the specific address with the new data
                    return updatedAddresses;
                });
            } else {
                console.error('Failed to update address:', data);
            }
        } catch (error) {
            console.error('Failed to update address:', error);
        }
    };

    const handleSelectAddress = (index) => {
        setCurrentIndex(index);
    };

    const handleBackClick = () => {
        setShowEditAddress(false);
    };

    return (
        <>
            {ShowEditAddress && (
                <div>
                    <div className="edit-address-container">
                        <h2 className="title">Edit Address</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="kelurahan">Kelurahan</label>
                                <input type="text" className="form-control" id="kelurahan" name="kelurahan" value={addresses[currentIndex]?.kelurahan || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="kecamatan">Kecamatan</label>
                                <input type="text" className="form-control" id="kecamatan" name="kecamatan" value={addresses[currentIndex]?.kecamatan || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="kabupaten">Kabupaten</label>
                                <input type="text" className="form-control" id="kabupaten" name="kabupaten" value={addresses[currentIndex]?.kabupaten || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="provinsi">Provinsi</label>
                                <input type="text" className="form-control" id="provinsi" name="provinsi" value={addresses[currentIndex]?.provinsi || ''} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="detail">Detail</label>
                                <input type="text" className="form-control" id="detail" name="detail" value={addresses[currentIndex]?.detail || ''} onChange={handleChange} />
                            </div>

                            <div className='form-group'>
                                <button type="submit" className="btnSubmit">Submit</button>
                            </div>

                            <div className="address-buttons">
                                {addresses.map((address, index) => (
                                    <button key={index} onClick={() => handleSelectAddress(index)} className={index === currentIndex ? "buttonActive" : "d"}>{index + 1}</button>
                                ))}
                            </div>
                            
                        </form>
                    </div>
                    <button onClick={handleBackClick} className='btn backEdit'>Back</button>
                </div>
            )}
            {!ShowEditAddress && <Profile />}
        </>
    );
}

export default EditAddress;
