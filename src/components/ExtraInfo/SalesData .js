import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import './SalesData.css';

const SalesData = ({ totalSales, salesPerMonth, salesPerWeek }) => {
    return (
        <div className="sales-data">
            <h3>Total Sales: {totalSales}</h3>
            <div className="sales-chart">
                <h4>Sales per Month (Last Year)</h4>
                <LineChart
                    width={500}
                    height={300}
                    data={salesPerMonth}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
            <div className="sales-chart">
                <h4>Sales per Week (Last 3 Months)</h4>
                <LineChart
                    width={500}
                    height={300}
                    data={salesPerWeek}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    );
};

export default SalesData;
