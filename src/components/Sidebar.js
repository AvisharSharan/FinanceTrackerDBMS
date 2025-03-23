import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; // You can style it here

// Import your SVG icons
import DashboardIcon from '../assets/icons/dash.svg';
import BudgetIcon from '../assets/icons/budget.svg';
import GoalsIcon from '../assets/icons/goals.svg';
import InsightsIcon from '../assets/icons/insights.svg';
import TransactionsIcon from '../assets/icons/transaction.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">FinTrack</h2>
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
    </div>
  );
};

export default Sidebar;
