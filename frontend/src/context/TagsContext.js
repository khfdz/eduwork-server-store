import React, { createContext, useContext, useState, useEffect } from 'react';

const TagsContext = createContext(); 

export const useTagsContext = () => {
    return useContext(TagsContext);
};

export const TagsProvider = ({ children }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/tags');
            const data = await response.json();
            if (response.ok) {
                setTags(data); // Langsung atur tags dengan data dari response
            } else {
                console.error('Failed to fetch tags:', data.message);
            }
        } catch (error) {
            console.error('Failed to fetch tags:', error);
        }
    };

    const addTag = async (formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('category', formData.category);

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3002/api/tags', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                setTags([...tags, data]);
            } else {
                console.error('Failed to add tag:', await response.text());
            }
        } catch (error) {
            console.error('Failed to add tag:', error);
      
        }
    };

    const deleteTag = async (tagId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3002/api/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setTags(tags.filter(tag => tag._id !== tagId));
            } else {
                console.error('Failed to delete tag:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to delete tag:', error);
        }
    };

    const updateTag = async (tagId, formData) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('category', formData.category);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3002/api/tags/${tagId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataToSend
        });

        if (response.ok) {
            console.log('Tag updated successfully');
            const updateTag = await response.json();
            setTags(tags.map(tag => tag._id === tagId ? updateTag : tag));
        } else {
            console.error('Failed to update tag:', response.statusText);
        }
    } catch (error) {
        console.error('Failed to update tag:', error);
    }
    };

    return (
        <TagsContext.Provider value={{ tags, fetchTags, addTag, deleteTag, updateTag }}>
            {children}
        </TagsContext.Provider>
    );
}
