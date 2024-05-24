import React, { useState } from 'react';
import { useCategory } from '../../context/CategoryContext';
import { useTag } from '../../context/TagContext';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    category: '',
    tags: ''
  });

  const categories = useCategory();
  const tags = useTag();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', formData.tags);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        console.log('Product added successfully');
        setFormData({
          name: '',
          price: '',
          description: '',
          image: null,
          category: '',
          tags: ''
        });
      } else {
        console.error('Failed to add product:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-addProduct">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group-addProduct">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group-addProduct">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="form-control" required></textarea>
        </div>
        <div className="form-group-addProduct">
          <label>Image:</label>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="form-control-file" required />
          {formData.image && (
            <div className="preview">
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className="img-fluid" />
              <p>{formData.image.name}</p>
            </div>
          )}
        </div>
        <div className="form-group-addProduct">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="form-control" required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group-addProduct">
          <label htmlFor="tags">Tags:</label>
          <select id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="form-control" required>
            <option value="">Select Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
