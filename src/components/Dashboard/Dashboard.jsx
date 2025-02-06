import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/availability">Daily Availability</Link></li>
          <li><Link to="/videos">Video Upload</Link></li>
          <li><Link to="/blogs">Blog Upload</Link></li>
          <li><Link to="/reviews">Client Reviews</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
          <li><Link to="/contacts">Contact Leads</Link></li>
          <li><Link to="/products">Product Management</Link></li>
          <li><Link to="/orders">Order Management</Link></li>
          <li><Link to="/cart">Cart Management</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;