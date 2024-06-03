import React, { useState } from 'react';
import "../../styles/TagsEditForm.css";
import { useTagsContext } from '../../context/TagsContext';
import { useCategoryContext } from '../../context/CategoryContext';

const TagsEditForm = ({ tag, onClose }) => {
    const [editedTag, setEditedTag] = useState({
        name: tag.name,
        image: null,
        category: tag.category
    });
    
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditedTag({
            ...editedTag,
            image: file,
        });
        setImagePreview(URL.createObjectURL(file));
    };

    const { updateTag, fetchTags } = useTagsContext();
    const { categories } = useCategoryContext();

    const handleSave = async () => {
        try {
            await updateTag(tag._id, {
                name: editedTag.name,
                image: editedTag.image,
                category: editedTag.category
            });
            onClose();
            fetchTags();
        } catch (error) {
            console.error('Failed to update tag:', error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className='container'>
            <form>
            
                <label>
                    <h3 className='addCategoryTitle'>Edit Tag</h3>
                    Name:
                    <input
                        type="text"
                    
                        value={editedTag.name}
                        onChange={(e) => setEditedTag({ ...editedTag, name: e.target.value })}
                    />
                </label>
                <label>
          <p>Tag Category: </p>
          <select
            className='form-control'
            id="category"
            name="category"
            value={editedTag.category}
            onChange={(e) => setEditedTag({ ...editedTag, category: e.target.value })}
          >
            <option value="">--Select Category--</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
                </label>
                <label>
          <p>Tag Image: </p>
          <div className='preview'>
          <img src={imagePreview || `http://localhost:3002/images/products/${tag.image_url}`} alt="Preview" className="product-image" style={{ width: '300px', marginLeft: '110px', marginBottom: '20px'}} />
          </div>
          <input 
          type="file" 
          name="image"
          id='image'
          accept="image/*"
          className='TagUploadFile' 
          onChange={handleImageChange} />

        </label>
                <button className="btn" type="submit" onClick={handleSave}>Save</button>
                <button className='btn' type="submit" onClick={handleCancel}>Cancel</button>

            </form>
        </div>
    );
};  

export default TagsEditForm;