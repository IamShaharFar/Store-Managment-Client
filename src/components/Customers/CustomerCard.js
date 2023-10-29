import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerCard.css';

function CustomerCard({ onDelete, customer_id, customer_name, customer_email, contact_number, address }) {
  return (
    <div className="customer-card">
        <img src='https://i.imgur.com/c1lJVt6.jpg' alt='Profile Image' className='profile-image'/>
        <div className="customer-info">
            <h2 className="customer-name">{customer_name}</h2>
            <p className="customer-email">Email: {customer_email}</p>
            <p className="contact-number">Contact: {contact_number}</p>
            <p className="address">Address: {address}</p>
        </div>
        <div className="button-container">
            <Link to={`/customer/${customer_id}`}><button className="update-button">Update</button></Link>
            <button className="delete-button" onClick={() => onDelete(customer_id)}>Delete</button>
        </div>
    </div>
  );
}

export default CustomerCard;





