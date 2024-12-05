
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/HomePage';
import Product from './pages/Product';
import ProductDetail from './components/ProductDetails';
import Category from './pages/Category';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/products' element={<Product />} />
          <Route path='/product/edit/:id' element={<ProductDetail />} />
          <Route path='/categories' element={<Category />} />



        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
