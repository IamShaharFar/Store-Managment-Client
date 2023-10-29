import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "./CustomerCard";
import "./Customers.css";
import AddNewCustomer from "./AddNewCustomer ";

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

  const deleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem("jwtToken"); // Assume token is stored in localStorage
      const response = await axios.delete(
        `http://localhost:3000/customers/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Customer deleted successfully:", response.data);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
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
      <AddNewCustomer
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerEmail={customerEmail}
        setCustomerEmail={setCustomerEmail}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        address={address}
        setAddress={setAddress}
        handleCustomerAdd={addCustomer}
      />

      <div className="customers-list">
        <h3 className="customers-title">All Customers</h3>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="filter-input"
          />
          <button
            onClick={() => toggleSortOrder("asc")}
            className="filter-button sort-asc-button"
          >
            Sort A-Z
          </button>
          <button
            onClick={() => toggleSortOrder("desc")}
            className="filter-button sort-desc-button"
          >
            Sort Z-A
          </button>
        </div>
        <div className="customers-list-container">
          {sortedCustomers.map((customer) => (
            <div key={customer._id}>
              <CustomerCard
                onDelete={deleteCustomer}
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
    </div>
  );
}

export default Customers;
