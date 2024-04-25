import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import searchIcon from '../assets/images/search.svg';
import OrderCart from './orderCart';
import Hamburger from '../pages/Hamburger'; 
import cartIcon from '../assets/images/cart.svg';
import hamburgerIcon from '../assets/images/hamburger.svg';

const Navbar = () => {
  const [showOrderCart, setShowOrderCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const handleClickCart = () => {
    setShowOrderCart(prevState => !prevState);
  };

  const handleClickCategory = () => {
    setShowOptions(prevState => !prevState);
  };

  const handleClickHamburger = () => {
    setShowHamburger(prevState => !prevState);
  };

  const handleCloseHamburger = () => {
    setShowHamburger(false);
  };

  return (
    <div className="container containerNavbar">
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-link hamburger" style={{
              backgroundImage: `url(${hamburgerIcon})`
            }} onClick={handleClickHamburger}>
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
      {showHamburger && <Hamburger onClose={handleCloseHamburger} />} {/* Pass handleCloseHamburger as a prop */}
    </div>
  );
};

export default Navbar;
