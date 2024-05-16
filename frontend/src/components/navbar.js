import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import searchIcon from '../assets/images/search.svg';
import OrderCart from './orderCart';
import Hamburger from './hamburger'; 
import cartIcon from '../assets/images/cart.svg';
import hamburgerIcon from '../assets/images/hamburger.svg';

const Navbar = ({ onSearch, onCategory }) => {
  const [showOrderCart, setShowOrderCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [query, setQuery] = useState('');

  

  const handleClickCart = () => {
    setShowOrderCart(prevState => !prevState);
  };

  const handleSubmenuClick = (category) => {
    console.log(category);
    setShowOptions(false); 
    onCategory(category);
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
          <li className="nav-item" onClick={() => setShowOptions(prevState => !prevState)}>
            <a className="nav-link" href="#">Categories</a>
            {showOptions && (
              <ul className="sub-menu">
                <li><a href="#" onClick={() => handleSubmenuClick('Food')}>Foods</a></li>
                <li><a href="#" onClick={() => handleSubmenuClick('Drink')}>Drinks</a></li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <input
              type="text"
              className="form-control search"
              placeholder="Search Menu..."
              style={{
                backgroundImage: `url(${searchIcon})`
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </li>
          <button className="searchButton" onClick={() => onSearch(query)}>Search</button>
          <li className="nav-item nav-link cart" href="#" style={{
              backgroundImage: `url(${cartIcon})`
            }} onClick={handleClickCart}>
          </li>
        </ul>
      </nav>
      {showOrderCart && <OrderCart />}
      {showHamburger && <Hamburger onClose={handleCloseHamburger} />}
    </div>
  );
};

export default Navbar;
