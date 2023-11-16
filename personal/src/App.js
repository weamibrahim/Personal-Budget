import React from 'react';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home/home';
import IncomeForm from './Components/Forms/incomeForm';
import ExpenseForm from './Components/Forms/expenseForm';
import UpdateForm from './Components/updateDetails/updateDetails';
import Header from './Components/Header/header';

function App() {


  const handleAddRecord = (newRecord) => {
    // Retrieve records from local storage
    const storedRecords = JSON.parse(localStorage.getItem('Records')) || [];
    
    // Update records with the new record
    const updatedRecords = [...storedRecords, newRecord];
    
    // Save records to local storage
    localStorage.setItem('Records', JSON.stringify(updatedRecords));


  };

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-income" element={<IncomeForm onAddRecord={handleAddRecord} />} />
        <Route path="/add-expense" element={<ExpenseForm onAddRecord={handleAddRecord} />} />
        <Route path='/update/:id' element={<UpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
