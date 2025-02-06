import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Availability from './components/Availability/Availability';
import VideoUpload from './components/Videos/VideoUpload';
import VideoList from './components/Videos/VideoList';
import BlogUpload from './components/Blogs/BlogUpload';
import BlogList from './components/Blogs/BlogList';
import Reviews from './components/Reviews/Reviews';
import Appointments from './components/Appointments/Appointments';
import Contacts from './components/Contacts/Contacts';
import Products from './components/Ecommerce/Products';
import Orders from './components/Ecommerce/Orders';
import Cart from './components/Ecommerce/Cart';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/videos/upload" element={<VideoUpload />} />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/blogs/upload" element={<BlogUpload />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;