import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/dates";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/orderCart.css";
import Order from '../components/order';

const OrderCart = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [showOrderCart, setShowOrderCart] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const orderDate = formatDate(new Date());
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);

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
        console.log(data); 
        setOrderItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    fetch("http://localhost:3002/api/delivery-addresses", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch delivery addresses');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); 
        setDeliveryAddresses(data);
      })
      .catch((error) => {
        console.error("Error fetching delivery addresses:", error);
      });
  }, []);

  const handleRemoveCartItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/carts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove cart item');
      }
      const updatedItems = orderItems.filter(item => item._id !== id);
      setOrderItems(updatedItems);
      console.log('Cart item removed successfully!');
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  }; 

  const handleAddQty = async (index) => {
    const updatedItems = [...orderItems];
    updatedItems[index].qty += 1;
    setOrderItems(updatedItems);
    try {
      console.log("Updating quantity to:", updatedItems[index].qty);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/carts/${orderItems[index]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          qty: updatedItems[index].qty,
          notes: updatedItems[index].notes // Sertakan juga catatan yang diperbarui
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      console.log("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  const handleSubtractQty = async (index) => {
    const updatedItems = [...orderItems];
    if (updatedItems[index].qty > 0) {
      updatedItems[index].qty -= 1;
      setOrderItems(updatedItems);
      try {
        console.log("Updating quantity to:", updatedItems[index].qty);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3002/api/carts/${orderItems[index]._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            qty: updatedItems[index].qty,
            notes: updatedItems[index].notes // Sertakan juga catatan yang diperbarui
          })
        });
        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }
        console.log("Quantity updated successfully!");
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
  
  const handleClose = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedItems = [...orderItems];
  
      // Loop melalui setiap item dan kirim permintaan PATCH untuk mengubah catatan
      for (let i = 0; i < updatedItems.length; i++) {
        const response = await fetch(`http://localhost:3002/api/carts/${updatedItems[i]._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            qty: updatedItems[i].qty,
            notes: updatedItems[i].notes 
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to update notes');
        }
      }
  
      // Jika berhasil, tutup order cart
      setShowOrderCart(false);
    } catch (error) {
      console.error("Error updating notes:", error);
    }
  };
  

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = 10/100 * subtotal; 
  const total = subtotal - discount;

  const totalPages = Math.ceil(orderItems.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, orderItems.length - 1);
  const displayedItems = orderItems.slice(startIndex, endIndex + 1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOrderClick = () => {
    setShowOrder(true);
    setShowOrderCart(false);
  };

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

                {displayedItems.map((item, index) => (
                  <div key={item._id} className="container orderListLayer2">
                    <button className="eraseButton" onClick={() => handleRemoveCartItem(item._id)}>X</button>
                    <div className="row">
                      <img src={`http://localhost:3002/images/products/${item.product.image_url}`} alt={item.product.name} className="orderListImage" />
                      <div className="col-5 orderListText">
                        <p className="orderListJudul">{item.product.name}</p>
                        <p className="orderListHarga">IDR {item.price}</p>
                        <input
                          className="orderListInput"
                          type="text"
                          placeholder="Add Notes..."
                          value={item.notes}
                          onChange={(e) => {
                            const newNotes = e.target.value;
                            const updatedItems = [...orderItems];
                            updatedItems[index].notes = newNotes;
                            setOrderItems(updatedItems);
                          }} // Mengupdate catatan secara lokal saat diubah
                        />
                      </div>
                      <div className="col-2 quantityControl">
                        <div className="quantityText">{item.qty}</div>
                        <button className="quantityButton1" onClick={() => handleSubtractQty(index)} disabled={item.qty === 0}> - </button>
                        <button className="quantityButton2" onClick={() => handleAddQty(index)}> + </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="paginationButtons">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                  ))}
                </div>

                <div className="subtotalLayer">
                  <table className="tableCart">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td>IDR {subtotal}</td>
                      </tr>
                      <tr>
                        <td>Discount:</td>
                        <td>IDR {discount}</td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td>IDR {total}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="garisTotal"></hr>
                  <button className="orderButton" onClick={handleOrderClick}>Order</button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
      {showOrder && deliveryAddresses.length > 0 && <Order orderItems={orderItems} subtotal={subtotal} discount={discount} total={total} deliveryAddresses={deliveryAddresses} onClose={() => setShowOrder(false)} />}

    </div>
  );
};

export default OrderCart;
