// App.js
import React from 'react';
import Home from './pages/Home';
import { AppProvider } from '../src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <div>
        <Home />
      </div>
    </AppProvider>
  );
};

export default App;
