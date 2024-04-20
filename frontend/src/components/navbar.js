import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import searchIcon from '../assets/images/search.svg';
import OrderCart from './orderCart'; 
import hamburgerIcon from '../assets/images/hamburger.svg';
import cartIcon from '../assets/images/cart.svg';

const Navbar = () => {
  const [showOrderCart, setShowOrderCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleClickCart = () => {
    setShowOrderCart(prevState => !prevState);
  };

  const handleClickCategory = () => {
    setShowOptions(prevState => !prevState);
  };

  return (
    <div className="container containerNavbar">
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-link hamburger" style={{
              backgroundImage: `url(${hamburgerIcon})`
            }} href="#">
          </li>
          <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
          <li className="nav-item" onClick={handleClickCategory}>
            <a className="nav-link" href="#">Kategori</a>
            {showOptions && (
              <ul className="sub-menu">
                <li><a href="#">Makanan</a></li>
                <li><a href="#">Minuman</a></li>
                <li><a href="#">Cemilan</a></li>
              </ul>
            )}
          </li>
          <input
            type="text"
            className="form-control search"
            placeholder="Search"
            style={{
              backgroundImage: `url(${searchIcon})`
            }}
          />
          <li className="nav-item nav-link cart" href="#" style={{
              backgroundImage: `url(${cartIcon})`
            }} onClick={handleClickCart}>
          </li>
        </ul>
      </nav>
      {showOrderCart && <OrderCart />}
    </div>
  );
};

export default Navbar;
