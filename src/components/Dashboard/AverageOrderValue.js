import React, { useState, useEffect } from 'react';
import './AverageOrderValue.css';

const AverageOrderValue = ({ orders }) => {
    const [timePeriod, setTimePeriod] = useState('All time');
    const [averageValue, setAverageValue] = useState(0);

    const calculateAverageOrderValue = () => {
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
        const totalRevenue = filteredOrders.reduce((acc, order) => acc + order.total_price, 0);
        
        const avgValue = filteredOrders.length ? totalRevenue / filteredOrders.length : 0;
        setAverageValue(avgValue.toFixed(2));
    };

    useEffect(() => {
        calculateAverageOrderValue();
    }, [orders, timePeriod]);

    return (
        <div className="aov-container">
            <h2>Average Order Value</h2>
            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
                <option value="All time">All time</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 6 months">Last 6 months</option>
                <option value="Last year">Last year</option>
            </select>
            <div className="value-amount">${averageValue}</div>
        </div>
    );
};

export default AverageOrderValue;
