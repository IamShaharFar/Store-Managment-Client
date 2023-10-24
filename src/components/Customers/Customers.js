import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./CustomerCard";
import "./Customers.css";

function Customers() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:3000/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data);
      console.log("customers", response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const addCustomer = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:3000/customers/add",
        {
          customer_name: customerName,
          customer_email: customerEmail,
          contact_number: contactNumber,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = (newSortOrder) => {
    if (sortOrder === newSortOrder) {
      setSortOrder("");
    } else {
      setSortOrder(newSortOrder);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers];
  if (sortOrder === "asc") {
    sortedCustomers.sort((a, b) =>
      a.customer_name.localeCompare(b.customer_name)
    );
  } else if (sortOrder === "desc") {
    sortedCustomers.sort((a, b) =>
      b.customer_name.localeCompare(a.customer_name)
    );
  }

  return (
    <div className="customers-container">
      <div className="add-customer">
        <h3 className="customers-title">Add Customer</h3>
        <input
          className="customers-input"
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          className="customers-input"
          type="email"
          placeholder="Customer Email"
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <input
          className="customers-input"
          type="text"
          placeholder="Contact Number"
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <input
          className="customers-input"
          type="text"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="customers-button" onClick={addCustomer}>
          Add Customer
        </button>
      </div>

      <div className="customers-list">
        <h3 className="customers-title">All Customers</h3>
        <div className="filter-section">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className={`sort-button ${
              sortOrder === "asc" ? "active-filter" : ""
            }`}
            onClick={() => toggleSortOrder("asc")}
          >
            Sort A-Z
          </button>
          <button
            className={`sort-button ${
              sortOrder === "desc" ? "active-filter" : ""
            }`}
            onClick={() => toggleSortOrder("desc")}
          >
            Sort Z-A
          </button>
        </div>
        {sortedCustomers.map((customer) => (
          <div key={customer._id}>
            <CustomerCard
              onDelete={fetchCustomers}
              key={customer._id}
              customer_id={customer._id}
              customer_name={customer.customer_name}
              customer_email={customer.customer_email}
              contact_number={customer.contact_number}
              address={customer.address}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
