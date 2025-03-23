import React from 'react';
import { Link } from 'react-router-dom';
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
      <h2 className="sidebar-title">FinTrack</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <img src={DashboardIcon} alt="Dashboard" className="icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/budget" className="sidebar-link">
              <img src={BudgetIcon} alt="Budget" className="icon" />
              Budget
            </Link>
          </li>
          <li>
            <Link to="/goals" className="sidebar-link">
              <img src={GoalsIcon} alt="Goals" className="icon" />
              Goals
            </Link>
          </li>
          <li>
            <Link to="/insights" className="sidebar-link">
              <img src={InsightsIcon} alt="Insights" className="icon" />
              Insights
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="sidebar-link">
              <img src={TransactionsIcon} alt="Transactions" className="icon" />
              Transactions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
