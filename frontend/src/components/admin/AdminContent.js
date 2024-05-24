import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import AddTags from './AddTags';

const fetchProducts = async (currentPage, setCurrentPage, setProducts, setTotalPages) => {
  try {
    const token = localStorage.getItem('token');
    // Fetch categories
    const categoryResponse = await fetch(`http://localhost:3002/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const categoryData = await categoryResponse.json();
    console.log('Categories:', categoryData); // Cetak data kategori
    
    // Fetch products
    const response = await fetch(`http://localhost:3002/api/products?skip=${(currentPage - 1) * 12}&limit=12`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      setProducts(data.data);
      setTotalPages(Math.ceil(data.count / 12));
    } else {
      console.error('Failed to fetch products:', data.message);
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};

const AdminContent = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editProductId, setEditProductId] = useState(null); // ID produk yang sedang diedit
  const [editProductData, setEditProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: null, // Menggunakan null untuk menyimpan file foto yang diunggah
    category: '',
    tags: ''
  });
  const [imageName, setImageName] = useState(''); // State untuk menyimpan nama file yang akan ditampilkan
  const [showEditForm, setShowEditForm] = useState(false); // State untuk menampilkan/menyembunyikan form edit

  useEffect(() => {
    fetchProducts(currentPage, setCurrentPage, setProducts, setTotalPages);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (productId) => {
    // Toggle form visibility jika tombol "Edit" diklik dua kali
    if (editProductId === productId) {
      setShowEditForm(!showEditForm);
    } else {
      setShowEditForm(true);
    }
    setEditProductId(productId);
    const productToEdit = products.find(product => product._id === productId);
    if (productToEdit) {
      setEditProductData({
        name: productToEdit.name,
        price: productToEdit.price,
        description: productToEdit.description,
        image: null, // Mengosongkan file foto yang diunggah sebelumnya
        category: productToEdit.category.name,
        tags: productToEdit.tags.name
      });
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        console.log(`Product with ID ${productId} deleted successfully.`);
        // Fetch products again to update the list after deletion
        fetchProducts(currentPage, setCurrentPage, setProducts, setTotalPages);
      } else {
        console.error(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // Jika input adalah file input untuk foto, simpan file yang diunggah
    if (name === 'image') {
      setEditProductData({
        ...editProductData,
        image: files[0] // Mengambil file pertama dari array file
      });
      // Mengatur nama file yang akan ditampilkan
      setImageName(files[0].name);
    } else {
      setEditProductData({
        ...editProductData,
        [name]: value
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', editProductData.name);
      formData.append('price', editProductData.price);
      formData.append('description', editProductData.description);
      formData.append('image', editProductData.image); // Mengirim file foto
      formData.append('category', editProductData.category);
      formData.append('tags', editProductData.tags);

      const response = await fetch(`http://localhost:3002/api/products/${editProductId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Product updated successfully:', data);
        // Reset form data and editProductId after successful update
        setEditProductData({
          name: '',
          price: '',
          description: '',
          image: null,
          category: '',
          tags: ''
        });
        setEditProductId(null);
        setShowEditForm(false); // Menyembunyikan form setelah berhasil update
        // Fetch products again to update the list after the edit
        fetchProducts(currentPage, setCurrentPage, setProducts, setTotalPages);
      } else {
        console.error('Failed to update product:', data.message);
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="admin-content">
      <AddTags />
      <AddProduct />

      <h2>Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Image</th>
            <th>Actions</th> {/* Kolom tambahan untuk tombol edit/delete */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <React.Fragment key={product._id}>
              <tr>
                <td>{(currentPage - 1) * 12 + index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>{product.tags.name}</td>
                <td>
                  <img src={`http://localhost:3002/images/products/${product.image_url}`} alt={product.name} style={{ maxWidth: '100px' }} />
                </td>
                <td>
                  <button onClick={() => handleEdit(product._id)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
              {/* Tampilkan form edit di bawah produk yang sesuai */}
              {editProductId === product._id && showEditForm && (
                <tr>
                  <td colSpan="8">
                    {/* Isi form edit di sini */}
                    <form onSubmit={handleEditSubmit}>
                      <div className="form-group">
                        <input type="text" name="name" value={editProductData.name} onChange={handleInputChange} className="form-control" placeholder="Product Name" />
                      </div>
                      <div className="form-group">
                        <input type="text" name="price" value={editProductData.price} onChange={handleInputChange} className="form-control" placeholder="Price" />
                      </div>
                      <div className="form-group">
                        <textarea name="description" value={editProductData.description} onChange={handleInputChange} className="form-control" placeholder="Description"></textarea>
                      </div>
                      <div className="form-group">
                        {/* Label untuk menampilkan nama file */}
                        <label className="form-control">{imageName}</label>
                        <input type="file" accept="image/*" name="image" onChange={handleInputChange} className="form-control-file" /> {/* Input file untuk upload foto */}
                      </div>
                      <div className="form-group">
                        <input type="text" name="category" value={editProductData.category} onChange={handleInputChange} className="form-control" placeholder="Category" />
                      </div>
                      <div className="form-group">
                        <input type="text" name="tags" value={editProductData.tags} onChange={handleInputChange} className="form-control" placeholder="Tags" />
                      </div>
                      <div className="form-group">
                        {/* Tombol untuk menutup form */}
                        <button type="button" className="btn btn-secondary mr-2" onClick={() => setShowEditForm(false)}>Close</button>
                        <button type="submit" className="btn btn-success">Save</button>
                      </div>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pageButton ${pageNumber + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
