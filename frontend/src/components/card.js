import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';
import ramenImage from '../assets/images/ramen.jpg'; // Import gambar ramen.jpg

const CardsList = () => {
    return (
        <div className="container">
          <p className="recomended">Recomended Products</p>
          <div className="row">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card">
                <img src={ramenImage} className="card-img-top" alt="Food" />
                <div className="card-body">
                  <h5 className="card-title">Ramen Chicken Katsu</h5>
                  <p className="card-text">Description of the food goes here.</p>
                  <button className="tagCard">Hot</button>
                  <p className="card-text price">IDR 50.000</p>
                  <button className="carto">+</button>
                  
                </div>
              </div>
            ))}
          </div>
          <button className="seeMore">See More</button>
        </div>
      );
      
}

export default CardsList;
