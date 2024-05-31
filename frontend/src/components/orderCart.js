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
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(pageSize - 1);

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

  useEffect(() => {
    const newStartIndex = (page - 1) * pageSize;
    const newEndIndex = Math.min(newStartIndex + pageSize - 1, orderItems.length - 1);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  }, [page, orderItems]);

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
    const itemIndex = startIndex + index; // Menyesuaikan indeks item dengan indeks pada halaman
    updatedItems[itemIndex].qty += 1;
    setOrderItems(updatedItems);
    try {
      console.log("Updating quantity to:", updatedItems[itemIndex].qty);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/carts/${orderItems[itemIndex]._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          qty: updatedItems[itemIndex].qty,
          notes: updatedItems[itemIndex].notes // Sertakan juga catatan yang diperbarui
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
    const itemIndex = startIndex + index; // Menyesuaikan indeks item dengan indeks pada halaman
    if (updatedItems[itemIndex].qty > 1) {
      updatedItems[itemIndex].qty -= 1;
      setOrderItems(updatedItems);
      try {
        console.log("Updating quantity to:", updatedItems[itemIndex].qty);
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3002/api/carts/${orderItems[itemIndex]._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            qty: updatedItems[itemIndex].qty,
            notes: updatedItems[itemIndex].notes // Sertakan juga catatan yang diperbarui
          })
        });
        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }
        console.log("Quantity updated successfully!");
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      alert('Quantity cannot be less than 1!');
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

  const displayedItems = orderItems.slice(startIndex, endIndex + 1);

  const totalQty = orderItems.reduce((total, item) => total + item.qty, 0);
  console.log('Total Quantity:', totalQty);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOrderClick = () => {
    if (totalQty === 0) {
      alert('Cart is empty. Cannot proceed with order!');
    } else {
      setShowOrder(true);
      setShowOrderCart(false);
    }
  };

  return (
    <div>
      {showOrderCart && (
        <>
          <div className="backgroundOverlay"></div>
          <div className={`orderCart ${showOrderCart ? "orderCartVisible" : "orderCartHidden"}`}>
            <div className="popup-card-orderCart">
              
                <div className="row orderListRow">
                  <div className="orderList col-8">Order List</div>
                  <div className="orderListTanggal col-4">{orderDate}</div>
                  
                  <button className="close-button-cart" onClick={handleClose}>X</button>
                </div>


               {displayedItems.map((item, index) => (
  <div key={item._id} className="container orderListLayer2">
    <div className="row position-relative">
      <button className="eraseButton position-absolute" onClick={() => handleRemoveCartItem(item._id)}>X</button>
      <div className="col-4">
        <img src={`http://localhost:3002/images/products/${item.product.image_url}`} alt={item.product.name} className="orderListImage" />
      </div>
      <div className="col-4">
        <div className="row">
          <div className="col-12 orderListText">
            <p className="orderListJudul">{item.product.name}</p>
          </div>
          <div className="col-12 orderListText">
            <p className="orderListHarga">IDR {item.price}</p>
          </div>
          <div className="col-12 orderListText">
            <input
              className="orderListInput"
              type="text"
              placeholder="Add Notes..."
              value={item.notes}
              onChange={(e) => {
                const newNotes = e.target.value;
                const updatedItems = [...orderItems];
                const itemIndex = startIndex + index;
                updatedItems[itemIndex].notes = newNotes;
                setOrderItems(updatedItems);
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="col-4">

      <div className="rowQuantityButton" style={{ display: "flex" }}>
  <div className="col-3 quantityControl">
    <button className="quantityButton1" onClick={() => handleSubtractQty(index)} disabled={item.qty === 0}> - </button>
  </div>
  <div className="col-3 quantityControl">
    <div className="quantityText">{item.qty}</div>
  </div>
  <div className="col-3 quantityControl">
    <button className="quantityButton2" onClick={() => handleAddQty(index)}> + </button>
  </div>
</div>



      </div>
    </div>
  </div>
))}
               <div className="paginationButtons">
  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i + 1}
      className={`pagination ${page === i + 1 ? 'active' : ''}`}
      onClick={() => handlePageChange(i + 1)}
    >
      {i + 1}
    </button>
  ))}
</div>



              <div className="subtotalContainer">
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
                  
                  <button className="orderButton" onClick={handleOrderClick} disabled={totalQty === 0}>Order</button>
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
