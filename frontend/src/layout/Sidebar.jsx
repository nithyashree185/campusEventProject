import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, TrendingUp, Vote, CheckSquare, PlusSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>CESP</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/events" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Calendar size={20} />
          <span>Events</span>
        </NavLink>

        <NavLink to="/suggest-idea" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <PlusSquare size={20} />
          <span>Suggest Idea</span>
        </NavLink>
        
        <NavLink to="/trending" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <TrendingUp size={20} />
          <span>Trending</span>
        </NavLink>

        <NavLink to="/votes" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <Vote size={20} />
          <span>Votes</span>
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin/ideas" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
            <CheckSquare size={20} />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
