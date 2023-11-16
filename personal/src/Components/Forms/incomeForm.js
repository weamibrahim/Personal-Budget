import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
const IncomeForm = ({ onAddRecord }) => {
  const navigate = useNavigate();
  const [incomeData, setIncomeData] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
    type: 'income',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate amount (positive number)
    if (parseFloat(incomeData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(incomeData.date)) {
      newErrors.date = 'Invalid date format (YYYY-MM-DD)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    onAddRecord(incomeData);
    setIncomeData({
      amount: '',
      category: '',
      date: '',
      description: '',
      type: 'income',
    });
    navigate('/');
  };

  return (
    <div className='d-flex justify-content-center background'>
        <div className='container-fluid bg '>
<h2 className='text-center my-2 text-white'> Create New income</h2>
<div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit} style={{ boxShadow: " 5px 5px 5px 5px #c8c8c8", padding: "10px", width: "500px" }} className='my-5 ' >
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={incomeData.amount}
          onChange={handleInputChange}
          required
          className="form-control mb-3"
        />
        {errors.amount && <p className="error">{errors.amount}</p>}

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={incomeData.category}
          onChange={handleInputChange}
          className="form-control mb-3"
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={incomeData.date}
          onChange={handleInputChange}
          required
          className="form-control mb-3"
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={incomeData.description}
          onChange={handleInputChange}
          className="form-control mb-3"
        />
<div className='d-flex justify-content-center'>
        <button type="submit" className='btn btn-info'>Add Income</button>
     </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default IncomeForm;
