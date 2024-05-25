import React, { useState } from 'react';
import { useTag } from '../../context/TagContext';

const AddTags = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });

  const tags = useTag();
  const [tagName, setTagName] = useState('');
  const [tagImage, setTagImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTagNameChange = (e) => {
    setTagName(e.target.value);
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
    setTagImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', tagName || formData.name);
      formDataToSend.append('image', tagImage || formData.image, (tagImage || formData.image).name);

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3002/api/tags', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setFormData({
          name: '',
          image: null,
        });
        setTagName('');
        setTagImage(null);
        // Refresh the tags after adding a new one
        tags.push(await response.json());
      } else {
        console.error('Failed to add tag:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Add New Tag</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group-addTags'>
          <label htmlFor="name">Tag Name:</label>
          <input type="text" id="name" name="name" value={tagName || formData.name} onChange={handleInputChange} required className='form-control'/>
        </div>
        <div className='form-group-addTags'>
          {tagImage && (
            <div>
              <img src={URL.createObjectURL(tagImage)} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}
          <label htmlFor="image">Tag Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTags;
