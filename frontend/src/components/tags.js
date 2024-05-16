// Tags.js

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/tags.css';

const Tags = ({ onTagsChange }) => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        async function fetchTags() {
            try {
                const response = await fetch('http://localhost:3002/api/tags');
                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        }

        fetchTags();
    }, []);

    const handleTagClick = (tagName) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(tag => tag !== tagName));
        } else {
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    useEffect(() => {
        onTagsChange(selectedTags); // Panggil fungsi onTagsChange dengan selectedTags sebagai argumen
    }, [selectedTags]);

    console.log('Selected tags:', selectedTags); // Tambahkan console log untuk selectedTags

    return (
        <div className="container">
            <div className="tags">
                {tags.map((tag, index) => (
                    <button 
                        key={index} 
                        className={`tag ${selectedTags.includes(tag.name) ? 'active' : ''}`} // Tambahkan kelas 'active' jika tag dipilih
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
