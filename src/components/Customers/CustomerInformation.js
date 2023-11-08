import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CustomerInformation.css";

function CustomerInformation() {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${baseUrl}/customers/${customer_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [customer_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("jwtToken"); // Retrieve the token from local storage
      await axios.put(`${baseUrl}/customers/update/${customer_id}`, customer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Customer updated successfully!");
    } catch (error) {
        alert(error)
      console.error("Error updating customer:", error);
    }
  };

  return isLoading ? (
    <div>
      Loading...
      <h1>loading</h1>
    </div>
  ) : (
    <div className="customer-information-container">
      <div className="customer-information">
        <h2>Update your Customer</h2>
        <hr />
        <label htmlFor="customer_name">Customer Name:</label>
        <input
          id="customer_name"
          name="customer_name"
          value={customer.customer_name}
          onChange={handleInputChange}
          placeholder="Customer Name"
        />

        <label htmlFor="customer_email">Customer Email:</label>
        <input
          id="customer_email"
          name="customer_email"
          value={customer.customer_email}
          onChange={handleInputChange}
          placeholder="Customer Email"
        />

        <label htmlFor="contact_number">Contact Number:</label>
        <input
          type="tel"
          id="contact_number"
          name="contact_number"
          value={customer.contact_number}
          onChange={handleInputChange}
          placeholder="Contact Number"
        />

        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          value={customer.address}
          onChange={handleInputChange}
          placeholder="Address"
        />

        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default CustomerInformation;
