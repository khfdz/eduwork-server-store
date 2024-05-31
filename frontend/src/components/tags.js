// Tags.js

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/tags.css';
import { useTagsContext } from '../context/TagsContext';

const Tags = ({ onTagsChange }) => {
    const { tags } = useTagsContext();
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tagName) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(tag => tag !== tagName));
        } else {
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    useEffect(() => {
        onTagsChange(selectedTags);
    }, [selectedTags]);

    console.log('Selected tags:', selectedTags);

    return (
        <div className="container">
            <div className="tags">
                {tags.map((tag, index) => (
                    <button 
                        key={index} 
                        className={`tag ${selectedTags.includes(tag.name) ? 'active' : ''}`} 
                        onClick={() => handleTagClick(tag.name)}
                    >
                        <img src={`http://localhost:3002/images/products/${tag.image_url}`} alt={tag.name} className="tagImage" />
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tags;
