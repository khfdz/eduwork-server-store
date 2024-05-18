import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/orderHistory.css';

// Invoice Component
const Invoice = ({ order }) => {
    // Menggabungkan informasi alamat pengiriman menjadi satu string
    const deliveryAddress = `${order.delivery_address.detail}, ${order.delivery_address.kelurahan}, ${order.delivery_address.kecamatan}, ${order.delivery_address.kabupaten}, ${order.delivery_address.provinsi}`;

    return (
        <div className="invoiceContainer mt-3 p-3 border rounded">
            <h4 className="invoiceTitle">Invoice for Order {order.order_number}</h4>
            <p className="invoiceInfo"><strong>Delivery Address:</strong> {deliveryAddress}</p>
            <p className="invoiceInfo"><strong>Delivery Fee:</strong> IDR {order.delivery_fee}</p>
            <h5>Items:</h5>
            <table className="invoiceTable table table-bordered">
                <thead>
                    <tr>
                        <th>Barang</th>
                        <th>Jumlah</th>
                        <th>Harga Satuan</th>
                        <th>Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {order.order_items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>IDR {item.price}</td>
                            <td>IDR {item.price * item.qty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Total:</strong> IDR {order.order_items.reduce((total, item) => total + item.price * item.qty, order.delivery_fee)}</p>
        </div>
    );
};

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [showItems, setShowItems] = useState({});
    const [showInvoice, setShowInvoice] = useState({});

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

    const toggleInvoice = (orderId) => {
        setShowInvoice(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    return (
        <div className="orderHistoryContainer mt-5">
            <h2 className="orderHistoryTitle">Order History</h2>
            <table className="orderHistoryTable table table-striped table-bordered">
                <thead>
                    <tr>
                        
                        <th>Order ID</th>
                        <th>Action</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.order_number}</td>
                            <td>
                                <button className="btn btn-primary btn-sm orderHistoryButton" onClick={() => toggleItemsTable(order.order_number)}>
                                    {showItems[order.order_number] ? "Hide" : "Show"}
                                </button>
                            </td>
                            <td>IDR {order.order_items.reduce((total, item) => total + item.price * item.qty, order.delivery_fee)}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm orderHistoryButton" onClick={() => toggleInvoice(order.order_number)}>
                                    {showInvoice[order.order_number] ? "Hide Invoice" : "Show Invoice"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders.map(order => (
                showItems[order.order_number] && (
                    <div key={order.order_number} className="mt-3">
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
                )
            ))}
            {orders.map(order => (
                showInvoice[order.order_number] && (
                    <Invoice key={order._id} order={order} />
                )
            ))}
        </div>
    );
};

export default OrderHistory;
