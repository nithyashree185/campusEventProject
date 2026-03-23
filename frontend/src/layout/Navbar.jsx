import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h2>Campus Events</h2>
      </div>
      <div className="navbar-user">
        <span className="user-info">
          <User size={18} />
          {user?.name || 'User'}
          <span className="role-badge">{user?.role}</span>
        </span>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
