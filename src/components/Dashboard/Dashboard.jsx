import React from "react";
import SideBar from "../SlideBar/SlideBar";
import Navbar from "../Navbar/Nav";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <SideBar />

      <div className="dashboard-content">
        <Navbar />
        <main className="dashboard-main">

          {/* Sales Overview */}
          <div className="section-row">
            <div className="section-card">
              <img src="/assets/sales-overview.png" alt="Sales" className="section-top-image" />
              <div className="card-header">
                <h3>Sales Overview</h3>
              </div>
              <div className="card-metrics">
                <div className="metric-box">
                  <img src="/assets/sales.png" className="metric-img" />
                  <h4>₹ 832</h4>
                  <p>Sales</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/revenue.png" className="metric-img" />
                  <h4>₹ 18,300</h4>
                  <p>Revenue</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/profit.png" className="metric-img" />
                  <h4>₹ 868</h4>
                  <p>Profit</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/cost.png" className="metric-img" />
                  <h4>₹ 17,432</h4>
                  <p>Cost</p>
                </div>
              </div>
            </div>

            {/* Purchase Overview */}
            <div className="section-card">
              <img src="/assets/purchase-overview.png" alt="Purchase" className="section-top-image" />
              <div className="card-header">
                <h3>Purchase Overview</h3>
              </div>
              <div className="card-metrics">
                <div className="metric-box">
                  <img src="/assets/purchase.png" className="metric-img" />
                  <h4>82</h4>
                  <p>Purchases</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/pcost.png" className="metric-img" />
                  <h4>₹ 13,573</h4>
                  <p>Cost</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/cancel.png" className="metric-img" />
                  <h4>5</h4>
                  <p>Cancelled</p>
                </div>
                <div className="metric-box">
                  <img src="/assets/return.png" className="metric-img" />
                  <h4>₹ 17,432</h4>
                  <p>Returned</p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="section-row">
            <div className="section-small-card">
              <img src="/assets/inventory-summary.png" className="section-top-image" />
              <div className="card-header">
                <h4>Inventory Summary</h4>
              </div>
              <p>868 Quantity in Hand</p>
              <p>200 To be received</p>
            </div>
            <div className="section-small-card">
              <img src="/assets/product-summary.png" className="section-top-image" />
              <div className="card-header">
                <h4>Product Summary</h4>
              </div>
              <p>31 Suppliers</p>
              <p>21 Categories</p>
            </div>
          </div>

          {/* Graphs */}
          <div className="section-row">
            <div className="section-graph">
              <h3>Sales & Purchase</h3>
              <img src="/assets/barchart.png" alt="chart" />
            </div>
            <div className="section-graph">
              <h3>Order Summary</h3>
              <img src="/assets/chart.png" alt="chart" />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;