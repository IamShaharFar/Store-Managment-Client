import React from 'react';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// function MonthlySalesChartLinear() {
//     // Data for the chart
//     const data = [
//         { month: 'Jan', sales: 10 },
//         { month: 'Feb', sales: 13 },
//         { month: 'Mar', sales: 15 },
//         { month: 'Apr', sales: 10 },
//         { month: 'May', sales: 20 },
//         { month: 'Jun', sales: 22 },
//         { month: 'Jul', sales: 19 },
//         { month: 'Aug', sales: 15 },
//         { month: 'Sep', sales: 20 },
//         { month: 'Oct', sales: 30 },
//         { month: 'Nov', sales: 33 },
//         { month: 'Dec', sales: 50 },
//     ];

//     return (
//         <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
//             <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//                 <Line type="monotone" dataKey="sales" stroke="#007BFF" />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//             </LineChart>
//         </div>
//     );
// }

// export default MonthlySalesChartLinear;
function MonthlySalesChart() {
    // Data for the chart
    const data = [
        { month: 'Jan', sales: 10 },
        { month: 'Feb', sales: 13 },
        { month: 'Mar', sales: 15 },
        { month: 'Apr', sales: 10 },
        { month: 'May', sales: 20 },
        { month: 'Jun', sales: 22 },
        { month: 'Jul', sales: 19 },
        { month: 'Aug', sales: 15 },
        { month: 'Sep', sales: 20 },
        { month: 'Oct', sales: 30 },
        { month: 'Nov', sales: 33 },
        { month: 'Dec', sales: 50 },
    ];

    return (
        <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
            <h1>Sales per month</h1>
            <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Bar dataKey="sales" fill="#007BFF" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
            </BarChart>
                         <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="sales" stroke="#007BFF" />
                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                 <XAxis dataKey="month" />
                 <YAxis />
                 <Tooltip />
                 <Legend />
             </LineChart>
        </div>
    );
}

export default MonthlySalesChart;



