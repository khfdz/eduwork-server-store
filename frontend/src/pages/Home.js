import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../src/components/navbar';
import Tags from '../../src/components/tags';
import Card from '../../src/components/card';
import '../styles/Home.css'; // Import file CSS untuk komponen Home

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Tags />
      <Card />
    </div>
  );
};

export default Home;
