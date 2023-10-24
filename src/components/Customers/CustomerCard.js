// CustomerCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CustomerCard.css';

function CustomerCard({ onDelete, customer_id, customer_name, customer_email, contact_number, address }) {

    const deleteCustomer = async () => {
        try {
            const token = localStorage.getItem('jwtToken');  // Assume token is stored in localStorage
            const response = await axios.delete(`http://localhost:3000/customers/delete/${customer_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Customer deleted successfully:', response.data);
            onDelete();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div className="customer-card">
            <div className="customer-info">
                <h2 className="customer-name">{customer_name}</h2>
                <p className="customer-email">Email: {customer_email}</p>
                <p className="contact-number">Contact: {contact_number}</p>
                <p className="address">Address: {address}</p>
            </div>
            <div className="button-container">
                <Link to={`/customer/${customer_id}`}><button className="update-button">Update</button></Link>
                <button className="delete-button" onClick={deleteCustomer}>Delete</button>
            </div>
        </div>
    );
}

export default CustomerCard;
