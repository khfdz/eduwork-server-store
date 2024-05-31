import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserData({
          fullname: data.full_name,
          email: data.email,
          role: data.role,
          _id: data._id 
        });
      } else {
        console.error('Failed to fetch user data:', data);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

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
      const quantity = data.reduce((acc, item) => acc + item.qty, 0);
      setCartQuantity(quantity);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const addToCart = async (productId) => {
    const requestData = {
      items: [{
        product: {
          _id: productId
        },
        qty: 1
      }]
    };

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:3002/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      fetchCartData(); 
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:3002/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        localStorage.removeItem('token');
        setUserData(null);
        window.location.reload()
      } else {
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartQuantity, 
      fetchCartData, 
      setCartQuantity, 
      handleLogoutClick, 
      userData, 
      setUserData, 
      addToCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
