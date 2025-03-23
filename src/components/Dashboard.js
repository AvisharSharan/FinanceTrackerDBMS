import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="welcome-header">
        <h1>Welcome back, {dashboardData.userName}!</h1>
        <p>It is the best time to manage your finances.</p>
      </div>

      {/* Key Metrics */}
      <div className="key-metrics">
        <div className="metric">
          <h3>Total Balance</h3>
          <p>${dashboardData.totalBalance}</p>
        </div>
        <div className="metric">
          <h3>Income</h3>
          <p>${dashboardData.income}</p>
        </div>
        <div className="metric">
          <h3>Expense</h3>
          <p>${dashboardData.expense}</p>
        </div>
        <div className="metric">
          <h3>Total Savings</h3>
          <p>${dashboardData.totalSavings}</p>
        </div>
      </div>

      {/* Money Flow Chart */}
      <div className="money-flow-chart">
        <h3>Money Flow</h3>
        <p>Chart will go here.</p>
      </div>

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Name</th>
              <th>Method</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recentTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.paymentName}</td>
                <td>{transaction.method}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget Overview */}
      <div className="budget-overview">
        <h3>Budget Overview</h3>
        <p>Donut chart will go here.</p>
      </div>

      {/* Saving Goals */}
      <div className="saving-goals">
        <h3>Saving Goals</h3>
        {dashboardData.savingGoals.map((goal, index) => (
          <div key={index} className="goal">
            <h4>{goal.name}</h4>
            <p>
              ${goal.saved} / ${goal.target} (
              {((goal.saved / goal.target) * 100).toFixed(0)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;