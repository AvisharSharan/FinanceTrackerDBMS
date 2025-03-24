import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // You can style it here

// Import your SVG icons
import DashboardIcon from '../assets/icons/dash.svg';
import BudgetIcon from '../assets/icons/budget.svg';
import GoalsIcon from '../assets/icons/goals.svg';
import InsightsIcon from '../assets/icons/insights.svg';
import TransactionsIcon from '../assets/icons/transaction.svg';

// Import your logo
import Logo from '../assets/icons/logo.png'; // Replace with the path to your logo

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      {/* Logo and FinTrack Text */}
      <div className="sidebar-header">
        <img src={Logo} alt="FinTrack Logo" className="sidebar-logo" />
        <h2 className="logo-text">FinTrack</h2>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <img src={DashboardIcon} alt="Dashboard" className="icon" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <img src={BudgetIcon} alt="Budget" className="icon" />
              Budget
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <img src={GoalsIcon} alt="Goals" className="icon" />
              Goals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/insights"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <img src={InsightsIcon} alt="Insights" className="icon" />
              Insights
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <img src={TransactionsIcon} alt="Transactions" className="icon" />
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;