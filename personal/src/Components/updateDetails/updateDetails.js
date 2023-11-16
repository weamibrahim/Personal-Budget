import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
    type: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Retrieve the specific record from local storage based on the index
    const storedRecords = JSON.parse(localStorage.getItem('Records')) || [];
    const selectedRecord = storedRecords[id];

    // Populate the form data with the details of the selected record
    if (selectedRecord) {
      setFormData({
        amount: selectedRecord.amount,
        category: selectedRecord.category,
        date: selectedRecord.date,
        description: selectedRecord.description,
        type: selectedRecord.type,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate amount (positive number)
    if (!/^\d*\.?\d+$/.test(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.date)) {
      newErrors.date = 'Invalid date format (YYYY-MM-DD)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    // Validate the form
    if (!validateForm()) {
      return;
    }

    // Retrieve records from local storage
    const storedRecords = JSON.parse(localStorage.getItem('Records')) || [];

    // Update the specific record with the new details
    storedRecords[id] = formData;

    // Save records to local storage
    localStorage.setItem('Records', JSON.stringify(storedRecords));

    // You can add additional logic here if needed

    // Redirect or navigate to the Home component
    // Example: history.push('/');
    navigate('/');
  };

  return (
    <div className='d-flex justify-content-center background'>
    <div className='container-fluid bg '>
<h2 className='text-center my-4 text-white'> update</h2>
<div className='d-flex justify-content-center'>
      
      <form style={{ boxShadow: " 5px 5px 5px 5px #c8c8c8", padding: "10px", width: "500px" }} className='my-5'>
        <label>
          Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-control mb-3"
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        
        <label>
          Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control mb-3"
          />
       
        <label>
          Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control mb-3"
          />
          {errors.date && <p className="error">{errors.date}</p>}
        
        <label>
          Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control mb-3"
          />
       
        <label>
          Type:</label>
          <select
              name='type'
              value={formData.type}
              onChange={handleChange}
              className='form-control mb-3'
            >
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
      
        <div className='d-flex justify-content-center'>
        <button type="button" className="btn btn-info" onClick={handleUpdate}>
          Update Record
        </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default UpdateForm;
