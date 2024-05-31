import React, { useState, useEffect } from 'react';
import '../styles/editAddress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './profile';

const EditAddress = ({ userId }) => {
    const [addresses, setAddresses] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEditAddress, setShowEditAddress] = useState(true);

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

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3002/api/delivery-addresses/${addresses[currentIndex]._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                console.log('Address deleted successfully');
                // Remove the deleted address from the state
                setAddresses(prevAddresses => prevAddresses.filter((_, index) => index !== currentIndex));
                // Reset currentIndex to 0 after deletion
                setCurrentIndex(0);
            } else {
                console.error('Failed to delete address');
            }
        } catch (error) {
            console.error('Failed to delete address:', error);
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
            {showEditAddress && (
                <div>
                    <div className="edit-address-container">
                        <div className="container editAddress">
                            <h2 className="title">Edit Address</h2>
                            <form className='formEditAddress' onSubmit={handleSubmit}>
                                <div className="">
                                    <label htmlFor="kelurahan">Kelurahan</label>
                                    <input type="text" className="form-control" id="kelurahan" name="kelurahan" value={addresses[currentIndex]?.kelurahan || ''} onChange={handleChange} />
                                </div>
                                <div className="">
                                    <label htmlFor="kecamatan">Kecamatan</label>
                                    <input type="text" className="form-control" id="kecamatan" name="kecamatan" value={addresses[currentIndex]?.kecamatan || ''} onChange={handleChange} />
                                </div>
                                <div className="">
                                    <label htmlFor="kabupaten">Kabupaten</label>
                                    <input type="text" className="form-control" id="kabupaten" name="kabupaten" value={addresses[currentIndex]?.kabupaten || ''} onChange={handleChange} />
                                </div>
                                <div className="">
                                    <label htmlFor="provinsi">Provinsi</label>
                                    <input type="text" className="form-control" id="provinsi" name="provinsi" value={addresses[currentIndex]?.provinsi || ''} onChange={handleChange} />
                                </div>
                                <div className="">
                                    <label htmlFor="detail">Detail</label>
                                    <input type="text" className="form-control" id="detail" name="detail" value={addresses[currentIndex]?.detail || ''} onChange={handleChange} />
                                </div>

                                <div className=''>
                                    <button type="submit" className="btnEdit">Save</button>
                                    <button type="" onClick={handleDelete} className="btnDelete">Delete</button>
                                </div>
                            </form>
                            <div className="address-buttons">
                                {addresses.map((address, index) => (
                                    <button key={index} onClick={() => handleSelectAddress(index)} className={index === currentIndex ? "buttonActive" : ""}>{index + 1}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleBackClick} className='btn backEdit'>Back</button>
                </div>
            )}
            {!showEditAddress && <Profile />}
        </>
    );
}

export default EditAddress;
