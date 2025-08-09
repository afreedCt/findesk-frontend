// GuestLandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GuestLandingPage = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-3 fw-bold">📊 finDesk </h1>
        <p className="lead">Track your income, expenses, and view profit & loss reports with ease.</p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-3 shadow">Login</Link>
          <Link to="/signup" className="btn btn-outline-secondary shadow">Register</Link>
        </div>
      </div>

      <hr />

      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <h4>📥 Add Transactions</h4>
          <p>Track income and expenses with details like category, status, and more.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h4>📈 View Reports</h4>
          <p>Get profit & loss summaries and download them as PDF.</p>
        </div>
        <div className="col-md-4 mb-4">
          <h4>💬 Comments</h4>
          <p>Engage with the community through the comment section with replies.</p>
        </div>
      </div>

      <footer className="text-center mt-5">
        <small>&copy; 2025 finDesk | Built by Afreed</small>
      </footer>
    </div>
  );
};

export default GuestLandingPage;
