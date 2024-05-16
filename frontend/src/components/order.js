import React, { useState } from "react";
import "../styles/order.css";

const Order = ({ orderItems, subtotal, discount, total, deliveryAddresses, onClose }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  const handlePlaceOrder = async () => {
    try {
      const selectedAddress = deliveryAddresses[selectedAddressIndex];
      const orderData = {
        delivery_fee: 20000, // Default delivery fee
        delivery_address: selectedAddress._id,
        items: orderItems.map(item => ({
          name: item.product.name,
          qty: item.qty,
          price: item.price,
          product: item.product._id,
          notes: item.notes
        }))
      };
  
      console.log("Sending order data:", orderData); // Log data sebelum mengirim
  
      const response = await fetch("http://localhost:3002/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
  
      const data = await response.json();
      console.log("Order data sent:", data); // Log data setelah mengirim
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <div className="orderContainer">
      <button className="closeButton" onClick={onClose}>
        X
      </button>
      <h2>Order Summary</h2>
      <div className="orderItems">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Notes</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderItems &&
              orderItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.product.name}</td>
                  <td>{item.notes}</td>
                  <td>IDR {item.price}</td>
                  <td>{item.qty}</td>
                  <td>IDR {item.price * item.qty}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="orderTotal">
        <p>Subtotal: IDR {subtotal}</p>
        <p>Discount: IDR {discount}</p>
        <p>Total: IDR {total}</p>
      </div>
      {/* Tampilkan data alamat dalam tabel */}
      <div className="deliveryAddresses">
        <h2>Delivery Addresses</h2>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Nama</th>
              <th>Kelurahan</th>
              <th>Kecamatan</th>
              <th>Kabupaten</th>
              <th>Provinsi</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(deliveryAddresses) &&
              deliveryAddresses.map((address, index) => (
                <tr key={address._id} className={index === selectedAddressIndex ? "selectedAddress" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      className="addressCheckbox"
                      checked={index === selectedAddressIndex}
                      onChange={() => handleAddressSelect(index)}
                    />
                  </td>
                  <td>{address.nama}</td>
                  <td>{address.kelurahan}</td>
                  <td>{address.kecamatan}</td>
                  <td>{address.kabupaten}</td>
                  <td>{address.provinsi}</td>
                  <td>{address.detail}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button className="orderButton" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Order;