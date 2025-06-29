import React from "react";
import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Reports.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const data = [
    { month: "Sep", revenue: 20000, profit: 10000 },
    { month: "Oct", revenue: 35000, profit: 15000 },
    { month: "Nov", revenue: 50000, profit: 30000 },
    { month: "Dec", revenue: 60000, profit: 25000 },
    { month: "Jan", revenue: 70000, profit: 40000 },
    { month: "Feb", revenue: 65000, profit: 30000 },
    { month: "Mar", revenue: 48000, profit: 25000 },
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-body">
         

          {/* Top Grid: Overview + Best Selling Category */}
          <div className="overview-and-category">
            <div className="overview-box card">
              <h3 className="overview-title">Overview</h3>

              {/* Row 1 */}
              <div className="overview-top-row">
                <div className="overview-item">
                  <p className="overview-value">₹21,190</p>
                  <p className="overview-label">Total Profit</p>
                </div>
                <div className="overview-item">
                  <p className="overview-value orange">₹18,300</p>
                  <p className="overview-label">Revenue</p>
                </div>
                <div className="overview-item">
                  <p className="overview-value purple">₹17,432</p>
                  <p className="overview-label">Sales</p>
                </div>
              </div>

              <hr className="overview-divider" />

              {/* Row 2 */}
              <div className="overview-bottom-row">
                <div className="overview-item">
                  <p className="overview-value">₹1,17,432</p>
                  <p className="overview-label">Net purchase value</p>
                </div>
                <div className="overview-item">
                  <p className="overview-value">₹80,432</p>
                  <p className="overview-label">Net sales value</p>
                </div>
                <div className="overview-item">
                  <p className="overview-value">₹30,432</p>
                  <p className="overview-label">MoM Profit</p>
                </div>
                <div className="overview-item">
                  <p className="overview-value">₹1,10,432</p>
                  <p className="overview-label">YoY Profit</p>
                </div>
              </div>
            </div>

            <div className="card best-category">
              <h4>Best Selling Category</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Turn Over</th>
                    <th>Increase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Vegetable</td><td>₹26,000</td><td className="green">3.2%</td></tr>
                  <tr><td>Instant Food</td><td>₹22,000</td><td className="green">2%</td></tr>
                  <tr><td>Households</td><td>₹22,000</td><td className="green">1.5%</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart Full Width */}
          <div className="card chart">
            <h4>Profit & Revenue</h4>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4a90e2" />
                <Line type="monotone" dataKey="profit" stroke="#f5a623" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Products Table Full Width */}
          <div className="card best-product">
            <h4>Best Selling Products</h4>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Product ID</th>
                  <th>Category</th>
                  <th>Remaining Quantity</th>
                  <th>Turn Over</th>
                  <th>Increase</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Tomato</td><td>23567</td><td>Vegetable</td><td>225 kg</td><td>₹17,000</td><td className="green">2.3%</td></tr>
                <tr><td>Onion</td><td>25831</td><td>Vegetable</td><td>200 kg</td><td>₹12,000</td><td className="green">1.3%</td></tr>
                <tr><td>Maggi</td><td>56841</td><td>Instant Food</td><td>200 Packet</td><td>₹10,000</td><td className="green">1.3%</td></tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;