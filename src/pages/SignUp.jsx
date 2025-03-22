import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import PixelArtCharacters from '../components/PixelArtCharacters';
import './SignUp.css';

const SignUp = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onLogin(); // Triggers handleLogin in App.jsx, which navigates to /dashboard
  };

  return (
    <div className="signup-container">
      {showPopup && (
        <div className="popup-overlay">
          <div className="welcome-popup">
            <button className="close-popup" onClick={handleClosePopup}>×</button>
            <h2>Welcome to NeuroHelp!</h2>
            <p>Join our community today and start your journey to better productivity and wellness.</p>
            <button className="popup-button" onClick={handleClosePopup}>Get Started</button>
          </div>
        </div>
      )}
      
      <header className="signup-header">
        <div className="logo">NeuroHelp</div>
        <nav>
          <Link to="/get-started">Get Started</Link>
          <Link to="/mobile-apps">Mobile Apps</Link>
          <Link to="/learn-more">Learn More</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </header>
      <div className="signup-content">
        <div className="signup-left">
          <h1>Motivate yourself to achieve your goals.</h1>
          <p>
            It's time to have fun when you get things done! Join over 4 million
            Habiticans and improve your life one task at a time.
          </p>
          <div className="pixel-art-characters">
            <PixelArtCharacters />
          </div>
        </div>
        <div className="signup-right">
          <h2>Sign Up For Free</h2>
          <p className="username-info">
            Username must be 1 to 20 characters, containing only letters a to z,
            numbers 0 to 9, hyphens, or underscores, and cannot include any
            inappropriate terms.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <p className="terms">
              By clicking the button below, you are indicating that you have read
              and agree to the <a href="/terms">Terms of Service</a> and{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="or-divider">
            <span>OR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;