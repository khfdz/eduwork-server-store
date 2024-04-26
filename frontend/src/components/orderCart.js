import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/dates";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/orderCart.css";

const OrderCart = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [showOrderCart, setShowOrderCart] = useState(true);
  const orderDate = formatDate(new Date());

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    fetch("http://localhost:3002/api/carts", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Tambahkan console log di sini untuk memeriksa isi dari data
        setOrderItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClose = () => {
    setShowOrderCart(false);
  };

  const handleAddQty = (index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].qty += 1;
    setOrderItems(updatedItems);
  };

  const handleSubtractQty = (index) => {
    const updatedItems = [...orderItems];
    if (updatedItems[index].qty > 0) {
      updatedItems[index].qty -= 1;
      setOrderItems(updatedItems);
    }
  };

  // Hitung total harga pesanan
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div>
      {showOrderCart && (
        <>
          <div className="backgroundOverlay"></div>
          <div className={`orderCart ${showOrderCart ? "orderCartVisible" : "orderCartHidden"}`}>
            <div className="container">
              <div className="container orderListLayer1">
                <div className="row orderListRow">
                  <div className="col-8 orderList">Order List</div>
                  <div className="col-4 orderListTanggal">{orderDate}</div>
                  <button className="closeButton" onClick={handleClose}>X</button>
                </div>

                {orderItems.map((item, index) => (
                  <div key={item._id} className="container orderListLayer2">
                    <div className="row">
                      <img src={`http://localhost:3002/images/products/${item.product.image_url}`} alt={item.product.name} className="orderListImage" />
                      <div className="col-5 orderListText">
                        <p className="orderListJudul">{item.product.name}</p>
                        <p className="orderListHarga">IDR {item.price}</p>
                        <input className="orderListInput" type="text" placeholder="Add Notes..." />
                      </div>
                      <div className="col-2 quantityControl">
                      <div className="quantityText">{item.qty}</div>
                        <button className="quantityButton1" onClick={() => handleSubtractQty(index)}>-</button>
                        <button className="quantityButton2" onClick={() => handleAddQty(index)}>+</button>
                      </div>
                      
                    </div>
                  </div>
                ))}
                <div className="subtotal">Subtotal: IDR {subtotal}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCart;
