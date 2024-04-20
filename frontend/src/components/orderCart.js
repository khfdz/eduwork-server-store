import React, { useState } from "react";
import { formatDate } from "../utils/dates"; // Buat fungsi formatDate untuk format tanggal
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/orderCart.css";
import ramenImage from "../assets/images/ramen.jpg"; // Import gambar ramen.jpg

const OrderCart = () => {
  const [quantity1, setQuantity1] = useState(0); // State untuk jumlah barang 1
  const [quantity2, setQuantity2] = useState(0); // State untuk jumlah barang 2
  const [quantity3, setQuantity3] = useState(0); // State untuk jumlah barang 3
  const [quantity4, setQuantity4] = useState(0); // State untuk jumlah barang 4

  const handleAdd1 = () => {
    setQuantity1((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtract1 = () => {
    if (quantity1 > 0) {
      setQuantity1((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAdd2 = () => {
    setQuantity2((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtract2 = () => {
    if (quantity2 > 0) {
      setQuantity2((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAdd3 = () => {
    setQuantity3((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtract3 = () => {
    if (quantity3 > 0) {
      setQuantity3((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAdd4 = () => {
    setQuantity4((prevQuantity) => prevQuantity + 1);
  };    

  const handleSubtract4 = () => {
    if (quantity4 > 0) {
      setQuantity4((prevQuantity) => prevQuantity - 1);
    }
  };

  const orderDate = formatDate(new Date()); // Mendapatkan tanggal hari ini dalam format yang diinginkan
    return (
        <div>
          <div className="container">

            <div className="container orderListLayer1">
                
            <div className="row orderListRow">
              <div className="col-8 orderList">Order List</div>
              <div className="col-4 orderListTanggal">{orderDate}</div>
            </div>
            
              <div className="container orderListLayer2">
                <div className="row">
                    

                    <img src={ramenImage} alt="ramen" className="orderListImage"/>
                  
                  <div className="col-5 orderListText">
                    <p className="orderListJudul">Ramen Chicken Katsu</p>
                    <p className="orderListHarga">IDR 50.000</p>
                    <input className="orderListInput" type="text" placeholder="Add Notes..."></input>
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

                    <img src={ramenImage} alt="ramen" className="orderListImage"/>
                  
                  <div className="col-5 orderListText">
                    <p className="orderListJudul">Ramen Chicken Katsu</p>
                    <p className="orderListHarga">IDR 50.000</p>
                    <input className="orderListInput" type="text" placeholder="Add Notes..."></input>
                  </div>
                  <div className="col-2 quantityControl">
                    <div className="quantityText">{quantity2}</div>
                    <button className="quantityButton1" onClick={handleSubtract2}>-</button>
                    <button className="quantityButton2" onClick={handleAdd2}>+</button>
                  </div>
                </div>
              </div>

              <div className="container orderListLayer2">
                <div className="row">

                    <img src={ramenImage} alt="ramen" className="orderListImage"/>
                  
                  <div className="col-5 orderListText">
                    <p className="orderListJudul">Ramen Chicken Katsu</p>
                    <p className="orderListHarga">IDR 50.000</p>
                    <input className="orderListInput" type="text" placeholder="Add Notes..."></input>
                  </div>
                  <div className="col-2 quantityControl">
                    <div className="quantityText">{quantity3}</div>
                    <button className="quantityButton1" onClick={handleSubtract3}>-</button>
                    <button className="quantityButton2" onClick={handleAdd3}>+</button>
                  </div>
                </div>
              </div>

              <div className="container orderListLayer2">
                <div className="row">

                    <img src={ramenImage} alt="ramen" className="orderListImage"/>
                  
                  <div className="col-5 orderListText">
                    <p className="orderListJudul">Ramen Chicken Katsu</p>
                    <p className="orderListHarga">IDR 50.000</p>
                    <input className="orderListInput" type="text" placeholder="Add Notes..."></input>
                  </div>
                  <div className="col-2 quantityControl">
                    <div className="quantityText">{quantity4}</div>
                    <button className="quantityButton1" onClick={handleSubtract4}>-</button>
                    <button className="quantityButton2" onClick={handleAdd4}>+</button>
                  </div>
                </div>
              </div>

            <div className="container orderListLayer3">
              <div className="row">
                <div className="col-8 orderListTotal">Subtotal</div>
                <div className="col-4 orderListHarga">IDR 150.000</div>
              </div>
              <div className="row">
                <div className="col-8 orderListTotal">Discount</div>
                <div className="col-4 orderListHarga">IDR 50.000</div>
              </div>
              <div className="row">
                <hr className="orderListGaris"/> 
                <div className="col-8 orderListTotal">Total</div>
                <div className="col-4 orderListHarga">IDR 100.000</div>
              </div>
              <div className="row">
                <button className="orderListButton">Checkout</button>
              </div>
            </div>

                

            </div>
          </div>
        </div>
      );
    }

      

export default OrderCart;
