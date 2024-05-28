import React, { useState } from 'react';
import "../../styles/TagsEditForm.css";
import { useTagsContext } from '../../context/TagsContext';

const TagsEditForm = ({ tag, onClose }) => {
    const [editedTag, setEditedTag] = useState({
        name: tag.name,
        image: null,
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

    const handleSave = async () => {
        try {
            await updateTag(tag._id, {
                name: editedTag.name,
                image: editedTag.image,
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
            <h3>Edit Tag</h3>
                <label>
                    Name:
                    <input
                        type="text"
                        value={editedTag.name}
                        onChange={(e) => setEditedTag({ ...editedTag, name: e.target.value })}
                    />
                </label>
                <label>
          <p>Image: </p>
          <img src={imagePreview || `http://localhost:3002/images/products/${tag.image_url}`} alt="Preview" className="product-image" style={{ width: '300px' }} />
          <input type="file" name="image" onChange={handleImageChange} />

        </label>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>

            </form>
        </div>
    );
};  

export default TagsEditForm;