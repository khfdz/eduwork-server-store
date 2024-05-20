// Home.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../src/components/navbar';
import Tags from '../../src/components/tags';
import Card from '../../src/components/card';
import '../styles/Home.css'; 

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalQty, setTotalQty] = useState(0);

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
      <Navbar onSearch={handleSearch} onCategory={handleCategory} totalQty={totalQty}/>
      <Tags onTagsChange={handleTags} />
      <Card searchQuery={searchQuery} selectedTags={selectedTags} selectedCategory={selectedCategory}/>
    </div>
  );
};

export default Home;
