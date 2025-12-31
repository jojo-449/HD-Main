import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  // 1. ADD 'user' here to check for isAdmin status
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>HDMODELS</Link>

        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/models" className="nav-link" onClick={closeMenu}>Models</Link>
          <Link to="/booking-history" className="nav-link" onClick={closeMenu}>Bookings</Link>
          
          {/* 2. ADMIN ONLY LINK: This only appears if the user is an Admin */}
          {user && user.isAdmin && (
            <Link to="/admin" className="nav-link admin-link-special" onClick={closeMenu}>
              Admin History
            </Link>
          )}

          <Link to="/model-enquiry" className="nav-link" onClick={closeMenu}>Join Us</Link>
          
          <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
