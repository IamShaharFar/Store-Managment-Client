import React, { useState, useEffect } from 'react';
import './TotalOrders.css';

const TotalOrders = ({ orders }) => {
    const [timePeriod, setTimePeriod] = useState('All time');
    const [totalOrders, setTotalOrders] = useState(0);

    const calculateTotalOrders = () => {
        const now = new Date();
        let startDate;

        switch (timePeriod) {
            case 'Last 7 days':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'Last 30 days':
                startDate = new Date(now.setDate(now.getDate() - 30));
                break;
            case 'Last 6 months':
                startDate = new Date(now.setMonth(now.getMonth() - 6));
                break;
            case 'Last year':
                startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
            default:
                startDate = new Date(0);
                break;
        }

        const filteredOrders = orders.filter(order => new Date(order.order_date) >= startDate);
        setTotalOrders(filteredOrders.length);
    };

    useEffect(() => {
        calculateTotalOrders();
    }, [orders, timePeriod]);

    return (
        <div className="total-orders-container">
            <h2>Total Orders</h2>
            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
                <option value="All time">All time</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 6 months">Last 6 months</option>
                <option value="Last year">Last year</option>
            </select>
            <div className="order-count">{totalOrders}</div>
        </div>
    );
};

export default TotalOrders;
