import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Budget.css';

const Budget = () => {
  const [budgets, setBudgets] = useState([]); // State to store budget data
  const [categories, setCategories] = useState([]); // State to store category data
  const [newBudget, setNewBudget] = useState({
    category: '',
    monthlyLimit: '',
  }); // State for the add budget form

  // Fetch budgets from the backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/budgets');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch budgets and categories on component mount
  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  // Handle form submission to add a new budget
  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/budgets', {
        category_id: newBudget.category,
        monthly_limit: parseFloat(newBudget.monthlyLimit),
        user_id: 1, // Replace with the actual user ID
      });
      setNewBudget({ category: '', monthlyLimit: '' }); // Reset the form
      fetchBudgets(); // Refresh the budget list
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div className="budget-container">
      <h2>Budget</h2>

      {/* Add Budget Form */}
      <form className="add-budget-form" onSubmit={handleAddBudget}>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={newBudget.category}
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="monthlyLimit">Monthly Limit:</label>
          <input
            type="number"
            id="monthlyLimit"
            value={newBudget.monthlyLimit}
            onChange={(e) =>
              setNewBudget({ ...newBudget, monthlyLimit: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Add Budget</button>
      </form>

      {/* Budget Table */}
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Monthly Limit</th>
            <th>Spent</th>
            <th>Remaining</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget, index) => {
            const remaining =
              (budget.monthly_limit || 0) - (budget.spent || 0);
            const progress = Math.min(
              ((budget.spent || 0) / (budget.monthly_limit || 1)) * 100,
              100
            );

            return (
              <tr key={index} className={remaining < 0 ? 'over-budget' : ''}>
                <td>{budget.category_name}</td>
                <td>${budget.monthly_limit || 0}</td>
                <td>${budget.spent || 0}</td>
                <td>${remaining}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {progress.toFixed(0)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Budget;