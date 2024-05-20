import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery, selectedTags, setSelectedTags, selectedCategory, setSelectedCategory }}>
      {children}
    </AppContext.Provider>
  );
};
