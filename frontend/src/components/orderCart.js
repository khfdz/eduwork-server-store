import React, { useState } from "react";
import { formatDate } from "../utils/dates";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/orderCart.css";
import ramenImage from "../assets/images/ramen.jpg";

const OrderCart = () => {
  const [quantity1, setQuantity1] = useState(0);
  const [showOrderCart, setShowOrderCart] = useState(true); // Mengubah initial state menjadi true agar popup slider muncul secara otomatis

  const handleAdd1 = () => {
    setQuantity1((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtract1 = () => {
    if (quantity1 > 0) {
      setQuantity1((prevQuantity) => prevQuantity - 1);
    }
  };

  const orderDate = formatDate(new Date());

  const handleClose = () => {
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


                <div className="container orderListLayer2">
                  <div className="row">
                    <img src={ramenImage} alt="ramen" className="orderListImage" />
                    <div className="col-5 orderListText">
                      <p className="orderListJudul">Ramen Chicken Katsu</p>
                      <p className="orderListHarga">IDR 50.000</p>
                      <input className="orderListInput" type="text" placeholder="Add Notes..." />
                    </div>
                    <div className="col-2 quantityControl">
                      <div className="quantityText">{quantity1}</div>
                      <button className="quantityButton1" onClick={handleSubtract1}>-</button>
                      <button className="quantityButton2" onClick={handleAdd1}>+</button>
                    </div>
                  </div>
                </div>

                                
                <div className="container orderListLayer2">
                  <div className="row">
                    <img src={ramenImage} alt="ramen" className="orderListImage" />
                    <div className="col-5 orderListText">
                      <p className="orderListJudul">Ramen Chicken Katsu</p>
                      <p className="orderListHarga">IDR 50.000</p>
                      <input className="orderListInput" type="text" placeholder="Add Notes..." />
                    </div>
                    <div className="col-2 quantityControl">
                      <div className="quantityText">{quantity1}</div>
                      <button className="quantityButton1" onClick={handleSubtract1}>-</button>
                      <button className="quantityButton2" onClick={handleAdd1}>+</button>
                    </div>
                  </div>
                </div>

                                
                <div className="container orderListLayer2">
                  <div className="row">
                    <img src={ramenImage} alt="ramen" className="orderListImage" />
                    <div className="col-5 orderListText">
                      <p className="orderListJudul">Ramen Chicken Katsu</p>
                      <p className="orderListHarga">IDR 50.000</p>
                      <input className="orderListInput" type="text" placeholder="Add Notes..." />
                    </div>
                    <div className="col-2 quantityControl">
                      <div className="quantityText">{quantity1}</div>
                      <button className="quantityButton1" onClick={handleSubtract1}>-</button>
                      <button className="quantityButton2" onClick={handleAdd1}>+</button>
                    </div>
                  </div>
                </div>

                <div className="container orderListLayer2">
                  <div className="row">
                    <img src={ramenImage} alt="ramen" className="orderListImage" />
                    <div className="col-5 orderListText">
                      <p className="orderListJudul">Ramen Chicken Katsu</p>
                      <p className="orderListHarga">IDR 50.000</p>
                      <input className="orderListInput" type="text" placeholder="Add Notes..." />
                    </div>
                    <div className="col-2 quantityControl">
                      <div className="quantityText">{quantity1}</div>
                      <button className="quantityButton1" onClick={handleSubtract1}>-</button>
                      <button className="quantityButton2" onClick={handleAdd1}>+</button>
                    </div>
                  </div>
                </div>

                
                
              </div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCart;
