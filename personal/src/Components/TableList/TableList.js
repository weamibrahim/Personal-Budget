import React from 'react';
import{NavLink} from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

const RecordTable = ({ records, onDeleteRecord }) => {
  return (
    <div>
    <div className="table-responsive">
      <table className='table table-striped transparent-background'>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} >
              <td>{record.amount}</td>
              <td>{record.category}</td>
              <td>{record.date}</td>
              <td>{record.description}</td>
              <td>{record.type}</td>
              <td>
          <button className='btn btn-primary mx-2'>  <NavLink className="text-decoration-none text-white" to={`/update/${index}`}><LiaEdit className='fs-2' /></NavLink></button>
            <button className='btn btn-danger mx-2' onClick={() => onDeleteRecord(index)}><MdDelete  className='fs-2'/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RecordTable;
