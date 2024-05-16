import React, { useState, useEffect } from 'react';
import '../styles/address.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const fetchData = async (userId) => {
    try {
        const response = await fetch('http://localhost:3002/api/delivery-addresses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            return data.filter(address => address.user === userId);
        } else {
            console.error('Failed to fetch address data:', data);
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch address data:', error);
        return [];
    }
};

const Address = ({ userId }) => {
    const [addressData, setAddressData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const addressesPerPage = 1;
    const totalPages = Math.ceil(addressData.length / addressesPerPage);

    useEffect(() => {
        fetchData(userId).then(data => {
            setAddressData(data);
            console.log('Address Data:', data); // Tambahkan console log di sini
        });
    }, [currentPage, userId]);

    const selectPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="address-container">
            <h2 className="title">Delivery Address</h2>
            {addressData
                .slice((currentPage - 1) * addressesPerPage, currentPage * addressesPerPage)
                .map((address, index) => (
                    <div className="address-details" key={index}>
                        <table className="address-table">
                            <tbody>
                                <tr>
                                    <th>Kelurahan</th>
                                    <td>{address.kelurahan}</td>
                                </tr>
                                <tr>
                                    <th>Kecamatan</th>
                                    <td>{address.kecamatan}</td>
                                </tr>
                                <tr>
                                    <th>Kabupaten</th>
                                    <td>{address.kabupaten}</td>
                                </tr>
                                <tr>
                                    <th>Provinsi</th>
                                    <td>{address.provinsi}</td>
                                </tr>
                                <tr>
                                    <th>Detail</th>
                                    <td>{address.detail}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            <div className="address-buttons">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => selectPage(i + 1)} className={currentPage === i + 1 ? "buttonActive " : "d"}>{i + 1}</button>
                ))}
            </div>
        </div>
    );
}

export default Address;
