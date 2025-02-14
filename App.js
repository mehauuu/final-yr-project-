import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Shipments from './pages/Shipments';
import Auth from './pages/ Auth.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Shipments" element={<Shipments />} />
        <Route path="/Auth.js" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;