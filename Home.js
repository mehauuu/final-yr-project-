import React, { useEffect, useRef } from 'react';
import './Home.css';
import { Chart } from 'chart.js/auto';
import { Link } from 'react-router-dom';

const Home = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Product Sales',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }, []);

  return (
    <div className="home-page">
      <div className="home-welcome">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path id="wave" d="M0,100 Q50,50 100,100 Z" fill="#333" />
        </svg>
        <h1>Welcome to Supply Chain Management</h1>
      </div>

      <nav className="home-navigation">
        <Link to="/products" className="navigation-link">Manage Products</Link>
        <Link to="/shipments" className="navigation-link">Track Shipments</Link>
        <Link to="/auth" className="navigation-link">User Profile</Link>
        {/* Add more links as needed */}
      </nav>

      <div className="home-navigation-panels">
        <div className="navigation-panel">
          <div className="navigation-panel-content">
            <Link to="/products">
              <h3>Manage Products</h3>
              <p>View, edit, and add products</p>
            </Link>
          </div>
        </div>
        <div className="navigation-panel">
          <div className="navigation-panel-content">
            <Link to="/shipments">
              <h3>Track Shipments</h3>
              <p>Monitor shipment statuses</p>
            </Link>
          </div>
        </div>
        <div className="navigation-panel">
          <div className="navigation-panel-content">
            <Link to="/auth"> {/* Assuming "/auth" leads to user profile or login */}
              <h3>User Profile</h3>
              <p>Manage your account details</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="trend-section">
        <h2>Recent Trends</h2>
        <div className="chart-frame">
          <canvas ref={chartRef} id="trendChart" className="trend-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Home;