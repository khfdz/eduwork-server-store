import React, { useState, useEffect } from 'react';
import '../styles/invoice.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceTable = () => {
    const [latestInvoice, setLatestInvoice] = useState(null);

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        };
    
        fetch('http://localhost:3002/api/invoices', {
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Sort invoices by order number in descending order
                const sortedInvoices = data.sort((a, b) => b.order.order_number - a.order.order_number);
                setLatestInvoice(sortedInvoices[0]);
            }
        })
        .catch(error => console.error('Error fetching invoices:', error));
    }, []);

    return (
        <div className="invoice-container">
            {latestInvoice && (
                <div className="invoice-wrapper">
                    <h2 className="invoice-title">Invoice</h2>
                    <table className="invoice-table">
                        <tbody>
                            <tr>
                                <th>Status</th>
                                <td>{latestInvoice.payment_status}</td>
                            </tr>
                            <tr>
                                <th>Order Number</th>
                                <td>{latestInvoice.order.order_number}</td>
                            </tr>
                            <tr>
                                <th>Total Amount</th>
                                <td>IDR {latestInvoice.total}</td>
                            </tr>
                            <tr>
                                <th>Billed To</th>
                                <td>{latestInvoice.user.full_name}, {latestInvoice.delivery_address.detail}, {latestInvoice.delivery_address.kelurahan}, {latestInvoice.delivery_address.kecamatan}, {latestInvoice.delivery_address.kabupaten}, {latestInvoice.delivery_address.provinsi}</td>
                            </tr>
                            <tr>
                                <th>Payment To</th>
                                <td>Raka Satya, rakasatyasembada@gmail.com, BCA xxxxxxxxxxxxx-xxxx-33-21-23</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;
