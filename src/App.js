import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate for redirection
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Goals from './components/Goals';
import Insights from './components/Insights';
import Transactions from './components/Transactions';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            {/* Default Route: Redirect '/' to '/dashboard' */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Other Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
