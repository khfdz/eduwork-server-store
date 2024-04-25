import React, { useState, useEffect } from 'react';

const DeliveryAddress = ({ address }) => {
    return (
        <div className="address-details">
            <p><strong>Kelurahan:</strong> {address.kelurahan}</p>
            <p><strong>Kecamatan:</strong> {address.kecamatan}</p>
            <p><strong>Kabupaten:</strong> {address.kabupaten}</p>
            <p><strong>Provinsi:</strong> {address.provinsi}</p>
            <p><strong>Detail:</strong> {address.detail}</p>
        </div>
    );
}

const Address = ({ userId }) => {
    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/delivery-addresses', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setAddressData(data.filter(address => address.user === userId));
                } else {
                    console.error('Failed to fetch address data:', data);
                }
            } catch (error) {
                console.error('Failed to fetch address data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="address-container">
            <h2>Delivery Address</h2>
            {addressData.map((address, index) => (
                <DeliveryAddress key={index} address={address} />
            ))}
        </div>
    );
}

export default Address;
