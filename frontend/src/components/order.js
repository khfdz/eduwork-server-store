import React, { useState, useContext } from "react";
import "../styles/order.css";
import Invoice from './invoice'; // Import komponen Invoice
import { CartContext } from "../context/CartContext";

const Order = ({ orderItems, subtotal, discount, total, deliveryAddresses, onClose }) => {
  const { fetchCartData } = useContext(CartContext);

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false); // State untuk menentukan apakah order berhasil dibuat

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

      console.log("Sending order data:", orderData);

      const response = await fetch("http://localhost:3002/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log("Order data sent:", data);

      // Set state menjadi true saat order berhasil dibuat
      setOrderSuccess(true);
      fetchCartData();

      // Menampilkan pesan sukses dan menutup Order setelah 2 detik
      setTimeout(() => {
        alert("Thank you for placing your order. Please proceed with the payment according to the invoice.");
        onClose(); // Menutup Order
      }, 100);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <button className="closeButtonOrder" onClick={onClose}>
          X
        </button>

        <div className="orderContainer">
          {/* Order Summary */}
          <div className="orderSummary">
            <h2>Order Summary</h2>
            <div className="orderItems">
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="orderItem">Item</th>
                    <th>Notes</th>
                    <th>Price</th>
                    <th className="orderQuantity">Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems &&
                    orderItems.map((item) => (
                      <tr key={item._id}>
                        <td className="orderItem">{item.product.name}</td>
                        <td>{item.notes}</td>
                        <td>IDR {item.price}</td>
                        <td>{item.qty}</td>
                        <td>IDR {item.price * item.qty}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Total */}
          <div className="orderTotalz">
            <p>Subtotal: IDR {subtotal}</p>
            <p>Delivery Fee: IDR 20000</p>
            <p>Discount: IDR {discount}</p>
            <hr />
            <p>Total: IDR {total}</p>
          </div>
        </div>

        {/* Delivery Addresses */}
        <div>
          <h2>Delivery Addresses</h2>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th className="selectColumn">Select</th>
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
                    <td className="selectColumn">
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

        {/* Place Order Button */}
        <button className="placeOrder" onClick={handlePlaceOrder}>Place Order</button>

        {/* Tampilkan Invoice jika order berhasil dibuat */}
        {orderSuccess && <Invoice />}

      </div>
    </div>
  );
};

export default Order;
