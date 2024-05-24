import React, { createContext, useContext, useState, useEffect } from 'react';

export const TagContext = createContext(); 
export const useTag = () => useContext(TagContext); 

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]); 

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch('http://localhost:3002/api/tags');
        if (response.ok) {
          const data = await response.json();
          setTags(data); 
        } else {
          console.error('Failed to fetch tags:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error); 
      }
    };

    fetchData(); 
  }, []);

  return (
    <TagContext.Provider value={tags}> 
      {children}
    </TagContext.Provider>
  );
};
