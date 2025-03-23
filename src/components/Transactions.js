import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [categories, setCategories] = useState([]); // State to store categories
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    category: '',
    type: '',
    description: '',
  }); // State for the add transaction form
  const [error, setError] = useState('');

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
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

  // Fetch data on component mount
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  // Handle form submission to add a new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.category || !newTransaction.type) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/transactions', newTransaction);
      setNewTransaction({ date: '', amount: '', category: '', type: '', description: '' }); // Reset the form
      setError('');
      fetchTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>

      {/* Add Transaction Form */}
      <form className="add-transaction-form" onSubmit={handleAddTransaction}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
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
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            required
          >
            <option value="">Select a type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Transaction</button>
      </form>

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.category_name}</td>
              <td>{transaction.type}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;