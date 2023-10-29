import React, { useState } from 'react';
import './AddNewCustomer.css';

const AddNewCustomer = ({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  contactNumber,
  setContactNumber,
  address,
  setAddress,
  handleCustomerAdd
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`add-customer ${isExpanded ? 'expanded' : ''}`}>
      <div className="add-customer-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="add-customer-title">
          Add New Customer
          {isExpanded ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
        </h2>
      </div>
      {isExpanded && (
        <div className="add-customer-form">
          <label>Customer Name</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          
          <label>Customer Email</label>
          <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
          
          <label>Contact Number</label>
          <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          
          <button onClick={handleCustomerAdd}>Add Customer</button>
        </div>
      )}
    </div>
  );
};

export default AddNewCustomer;
