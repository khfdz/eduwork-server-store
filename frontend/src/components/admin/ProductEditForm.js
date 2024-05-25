import React, { useState } from 'react';

const ProductEditForm = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  // Fungsi untuk mengirim perubahan ke backend
  const handleSave = () => {
    // Kode untuk menyimpan perubahan ke backend
    onClose(); // Tutup form setelah menyimpan perubahan
  };

  // Fungsi untuk membatalkan edit dan menutup form
  const handleCancel = () => {
    setEditedProduct(product); // Kembali ke data asli
    onClose(); // Tutup form
  };

  // Fungsi untuk mengubah data produk saat ada perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Edit Product</h3>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={editedProduct.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
        </label>
        {/* Form untuk field lainnya disini */}
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductEditForm;
