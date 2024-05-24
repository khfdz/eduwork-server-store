import React from 'react';
import AdminContent from '../components/admin/AdminContent';
import Navbar from '../components/navbar';
import { CartProvider } from '../../src/context/CartContext';
import { CategoryProvider } from '../../src/context/CategoryContext';
import { TagProvider } from '../../src/context/TagContext';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <CartProvider>
        <Navbar />
        <div className="admin-main">
          <CategoryProvider> {/* Gunakan CategoryProvider di sini */}
            <TagProvider> {/* Gunakan TagProvider di sini */}
              <AdminContent />
            </TagProvider>
          </CategoryProvider>
        </div>
      </CartProvider>
    </div>
  );
};

export default AdminDashboard;
