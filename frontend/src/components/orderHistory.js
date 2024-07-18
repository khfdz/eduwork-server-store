import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderHistory.css';
import Order from './order'; 
import Invoice from './invoice'; 
import Profile from './profile';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [showItems, setShowItems] = useState({});
    const [selectedOrderId, setSelectedOrderId] = useState(null); 
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null); 
    const [showOrderHistory, setShowOrderHistory] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                };
                const response = await fetch('http://localhost:3002/api/orders', {
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                console.log('Data fetched:', data);
                setOrders(data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const toggleItemsTable = (orderId) => {
        setShowItems(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    const toggleOrderDetails = (orderId) => {
        setSelectedOrderId(selectedOrderId === orderId ? null : orderId); // Toggle selectedOrderId
    };

    const toggleInvoiceDetails = (orderId) => {
        setSelectedInvoiceId(selectedInvoiceId === orderId ? null : orderId); // Toggle selectedInvoiceId
    };

    const handleBackClick = () => {
        setShowOrderHistory(false);
    };


    return (
        <>
        {showOrderHistory &&(
        <div>
        <div className="orderHistoryContainer">
            <h2 className="orderHistoryTitle">Order History</h2>
            <table className="orderHistoryTable table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className='orderOrder'>Order</th>
                        <th className='orderTotal'>Total</th>
                        <th className='orderStatus'>Status</th>
                        <th className='orderInvoice'>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.map(order => (
                        <React.Fragment key={order._id}>
                            <tr>
                                <td onClick={() => toggleOrderDetails(order.order_number)} style={{ cursor: 'pointer' }}>
                                    {selectedOrderId === order.order_number ? order.order_number + " v" : order.order_number + " >"} {/* Tampilkan tanda > atau v berdasarkan apakah pesanan telah diklik */}
                                </td>
                                <td>IDR {order.order_items.reduce((total, item) => total + item.price * item.qty, order.delivery_fee)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button className="showInvoiceButton" onClick={() => toggleInvoiceDetails(order.order_number)}>
                                        {selectedInvoiceId === order.order_number ? "Hide" : "Show"}
                                    </button>
                                </td>
                            </tr>
                            {selectedOrderId === order.order_number && (
                                <tr>
                                    <td colSpan="4"> {/* Membuat kolom untuk menampilkan detail order */}
                                        <div className="mt-3">
                                            <h3>Order ID: {order.order_number}</h3>
                                            <table className="table table-sm table-hover table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Barang</th>
                                                        <th>Jumlah</th>
                                                        <th>Total Harga</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.order_items.map(item => (
                                                        <tr key={item._id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.qty}</td>
                                                            <td>IDR {item.price * item.qty}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {selectedInvoiceId === order.order_number && (
                                <tr>
                                    <td colSpan="4"> {/* Membuat kolom untuk menampilkan detail invoice */}
                                        <div className="mt-3">
                                            <Invoice order={order} />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            
        </div>
        <button onClick={handleBackClick} className='btnBackEdit'>Back</button>
    </div>
    )
    }
    {!showOrderHistory &&  <Profile />}
    </>
    );
};

export default OrderHistory;
