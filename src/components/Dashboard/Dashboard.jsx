import React from "react";
import SideBar from "../SlideBar/SlideBar";
import Navbar from "../Navbar/Nav";
import {
  BiSolidCoinStack,
  BiSolidUserVoice,
  BiCategory,
} from "react-icons/bi";
import {
  AiOutlineRise,
  AiOutlineShoppingCart,
  AiOutlineBarChart,
} from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaBoxes, FaTruck } from "react-icons/fa";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

const Dashboard = () => {
  const salesData = [
    { name: "Jan", sales: 4000, purchase: 2400 },
    { name: "Feb", sales: 3000, purchase: 1398 },
    { name: "Mar", sales: 2000, purchase: 9800 },
    { name: "Apr", sales: 2780, purchase: 3908 },
    { name: "May", sales: 1890, purchase: 4800 },
  ];

  const orderData = [
    { name: "Mon", orders: 100 },
    { name: "Tue", orders: 200 },
    { name: "Wed", orders: 150 },
    { name: "Thu", orders: 300 },
    { name: "Fri", orders: 250 },
  ];

  return (
    <div className="dashboard-wrapper">
      <SideBar />
      <div className="dashboard-content">
        <Navbar />
        <main className="dashboard-main">

          <div className="dashboard-row">
            <div className="section-card">
              <div className="card-header"><h3>Sales Overview</h3></div>
              <div className="card-metrics">
                <div className="metric-box blue">
                  <div className="metric-icon"><BiSolidCoinStack className="metric-icon-symbol" /></div>
                  <h4>₹ 832</h4>
                  <p>Sales</p>
                </div>
                <div className="metric-box purple">
                  <div className="metric-icon"><AiOutlineRise className="metric-icon-symbol" /></div>
                  <h4>₹ 18,300</h4>
                  <p>Revenue</p>
                </div>
                <div className="metric-box orange">
                  <div className="metric-icon"><BsBarChartFill className="metric-icon-symbol" /></div>
                  <h4>₹ 868</h4>
                  <p>Profit</p>
                </div>
                <div className="metric-box green">
                  <div className="metric-icon"><RiMoneyRupeeCircleLine className="metric-icon-symbol" /></div>
                  <h4>₹ 17,432</h4>
                  <p>Cost</p>
                </div>
              </div>
            </div>

            <div className="section-card">
              <div className="card-header"><h3>Inventory Summary</h3></div>
              <div className="card-metrics">
                <div className="metric-box orange">
                  <div className="metric-icon"><FaBoxes className="metric-icon-symbol" /></div>
                  <h4>868</h4>
                  <p>Quantity in Hand</p>
                </div>
                <div className="metric-box blue">
                  <div className="metric-icon"><FaTruck className="metric-icon-symbol" /></div>
                  <h4>200</h4>
                  <p>To be Received</p>
                </div>
              </div>
            </div>
          </div>


          <div className="dashboard-row">
            <div className="section-card">
              <div className="card-header"><h3>Purchase Overview</h3></div>
              <div className="card-metrics">
                <div className="metric-box blue">
                  <div className="metric-icon"><AiOutlineShoppingCart className="metric-icon-symbol" /></div>
                  <h4>82</h4>
                  <p>Purchases</p>
                </div>
                <div className="metric-box green">
                  <div className="metric-icon"><RiMoneyRupeeCircleLine className="metric-icon-symbol" /></div>
                  <h4>₹ 13,573</h4>
                  <p>Cost</p>
                </div>
                <div className="metric-box orange">
                  <div className="metric-icon"><BsBarChartFill className="metric-icon-symbol" /></div>
                  <h4>5</h4>
                  <p>Cancelled</p>
                </div>
                <div className="metric-box purple">
                  <div className="metric-icon"><AiOutlineBarChart className="metric-icon-symbol" /></div>
                  <h4>₹ 17,432</h4>
                  <p>Return</p>
                </div>
              </div>
            </div>

            <div className="section-card">
              <div className="card-header"><h3>Product Summary</h3></div>
              <div className="card-metrics">
                <div className="metric-box green">
                  <div className="metric-icon"><BiSolidUserVoice className="metric-icon-symbol" /></div>
                  <h4>31</h4>
                  <p>Suppliers</p>
                </div>
                <div className="metric-box purple">
                  <div className="metric-icon"><BiCategory className="metric-icon-symbol" /></div>
                  <h4>21</h4>
                  <p>Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Charts */}
          <div className="dashboard-row">
            <div className="section-card chart-card">
              <div className="card-header"><h3>Sales & Purchase</h3></div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#8884d8" />
                    <Bar dataKey="purchase" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="section-card chart-card">
              <div className="card-header"><h3>Order Summary</h3></div>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;