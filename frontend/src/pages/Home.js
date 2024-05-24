// Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../src/components/navbar';
import Tags from '../../src/components/tags';
import Card from '../../src/components/card';
import { useAppContext } from '../context/AppContext';
import '../styles/Home.css'; 
import { CartProvider } from '../../src/context/CartContext';


const Home = () => {
  const { searchQuery, selectedTags, selectedCategory, setSearchQuery, setSelectedTags, setSelectedCategory } = useAppContext();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTags = (tagsQuery) => { 
    setSelectedTags(tagsQuery);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="home-container">
      <CartProvider>
      <Navbar onSearch={handleSearch} onCategory={handleCategory}/>
      <Tags onTagsChange={handleTags} />
      <Card searchQuery={searchQuery} selectedTags={selectedTags} selectedCategory={selectedCategory}/>
      </CartProvider>
    </div>
  );
};

export default Home;
