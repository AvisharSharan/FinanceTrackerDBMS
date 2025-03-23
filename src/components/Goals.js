import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([]); // State to store goals
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
  }); // State for the add goal form
  const [error, setError] = useState('');

  // Fetch goals from the backend
  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Handle form submission to add a new goal
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      setError('All fields are required.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/goals', {
        name: newGoal.name,
        target: parseFloat(newGoal.target),
        deadline: newGoal.deadline,
      });
      setNewGoal({ name: '', target: '', deadline: '' }); // Reset the form
      setError('');
      fetchGoals(); // Refresh the goals list
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <div className="goals-container">
      <h2>Goals</h2>

      {/* Add Goal Form */}
      <form className="add-goal-form" onSubmit={handleAddGoal}>
        <div>
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="target">Target Amount:</label>
          <input
            type="number"
            id="target"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal({ ...newGoal, deadline: e.target.value })
            }
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Goal</button>
      </form>

      {/* Goals List */}
      <div className="goals-list">
        {goals.map((goal, index) => {
          const progress = Math.min(
            (goal.saved_amount / goal.target_amount) * 100,
            100
          );
          return (
            <div key={index} className="goal-item">
              <h3>{goal.name}</h3>
              <p>
                Saved: ${goal.saved_amount} / ${goal.target_amount}
              </p>
              <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{progress.toFixed(0)}% Complete</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;