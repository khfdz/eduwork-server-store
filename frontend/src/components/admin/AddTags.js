import React, { useState } from 'react';
import { useTag } from '../../context/TagContext';

const AddTags = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });

  const { addTag } = useTag();
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
      formDataToSend.append('image', tagImage || formData.image, (tagImage || formData.image).name); // append the file with its original name

      console.log('Data to be sent:', {
        name: tagName || formData.name,
        image: (tagImage || formData.image).name, // send only the image name, not the entire file object
      });

      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Make a POST request to add the tag with the Authorization header
      const response = await fetch('http://localhost:3002/api/tags', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Tag added successfully');
        setFormData({
          name: '',
          image: null,
        });
        setTagName('');
        setTagImage(null);
      } else {
        console.error('Failed to add tag:', await response.text());
      }
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
    window.location.reload();
  };

  const tags = useTag();

  return (
    <div>
      <h2>Add New Tag</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tag Name:</label>
          <input type="text" id="name" name="name" value={tagName || formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          {/* Tambahkan pratinjau untuk gambar yang dipilih */}
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

      {/* Tabel tags */}
      <h2>Tags</h2>
      <table>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {/* Isi tabel tags */}
          {tags.map((tag, index) => (
            <tr key={index}>
              <td>{tag.name}</td>
              <td>{tag.image_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddTags;
