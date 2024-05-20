import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import searchIcon from '../assets/images/search.svg';
import OrderCart from './orderCart';
import Hamburger from './hamburger';
import cartIcon from '../assets/images/cart.svg';
import hamburgerIcon from '../assets/images/hamburger.svg';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { setSearchQuery, setSelectedCategory } = useAppContext();

  const [showOrderCart, setShowOrderCart] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [query, setQuery] = useState('');
  const [cartQuantity, setCartQuantity] = useState(0); // State untuk menyimpan jumlah item di keranjang

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:3002/api/carts", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        // Menghitung jumlah item di keranjang
        const quantity = data.reduce((acc, item) => acc + item.qty, 0);
        console.log("Cart Quantity:", quantity); // Tampilkan jumlah item di keranjang
        setCartQuantity(quantity);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []); // useEffect akan dijalankan sekali saat komponen dimount

  const handleClickCart = () => {
    setShowOrderCart(prevState => !prevState);
  };

  const handleSubmenuClick = (category) => {
    setShowOptions(false);
    setSelectedCategory(category);
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
          <button className="searchButton" onClick={() => setSearchQuery(query)}>Search</button>
          <li className="nav-item nav-link cart" href="#" style={{
            backgroundImage: `url(${cartIcon})`
          }} onClick={handleClickCart}>
            {cartQuantity > 0 && <span className="cart-quantity">{cartQuantity}</span>} {/* Menampilkan jumlah item di keranjang */}
          </li>
        </ul>
      </nav>
      {showOrderCart && <OrderCart />}
      {showHamburger && <Hamburger onClose={handleCloseHamburger} />}
    </div>
  );
};

export default Navbar;
