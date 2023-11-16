import React, { useState, useEffect } from 'react';
import RecordTable from '../TableList/TableList';
import { NavLink } from 'react-router-dom';
import "./home.css"
const Home = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Retrieve records from local storage on component mount
    const storedRecords = JSON.parse(localStorage.getItem('Records')) || [];
    setRecords(storedRecords);
  }, []);

 

  const handleDeleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
    // Save records to local storage whenever records change
    localStorage.setItem('Records', JSON.stringify(updatedRecords));
  };

  const calculateSummary = () => {
    const totalIncome = records
      .filter(record => record.type === 'income')
      .reduce((sum, record) => sum + parseFloat(record.amount), 0);

    const totalExpenses = records
      .filter(record => record.type === 'expense')
      .reduce((sum, record) => sum + parseFloat(record.amount), 0);

    const balance = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      balance,
    };
  };

  const summary = calculateSummary();

  return (
    <div className='background'>
    <div className='container '>
   <div className='d-flex justify-content-around '>
   <button className='btn btn-success my-4'>  <NavLink to="/add-income" className="text-decoration-none text-white">Add Income</NavLink></button>
   <button className='btn btn-info my-4'>     <NavLink to="/add-expense" className="text-decoration-none text-white">Add Expense</NavLink></button>
     </div>
      <RecordTable
        records={records}
     
        onDeleteRecord={handleDeleteRecord}
      />
      <h2 className='text-center my-4 text-white'>Summary</h2>
      <div className='text-center   summary'>
       
        <div className='fs-3'>Total Income: {summary.totalIncome}</div>
        <div className='fs-3'>Total Expenses: {summary.totalExpenses}</div>
        <div className='fs-3'>Balance: {summary.balance}</div>
      </div>
    </div>
    </div>
  );
};

export default Home;
