import React, { useState } from "react";
import Navbar from "../Navbar/Nav.jsx";
import Sidebar from "../SlideBar/SlideBar";
import './Inventory.css';

// ✅ Distinct product names
const productNames = [
  "Maggi", "Pepsi", "Coca Cola", "Red Bull", "Bourn Vita", "Horlicks", "Ariel", "Harpic", "Fanta", "Sprite",
  "Tide", "Lux Soap", "Pears", "Dettol", "Dove", "Clinic Plus", "Nestle", "Parle-G", "Good Day", "Unibic",
  "Lays", "Kurkure", "Bingo", "Monster", "7UP", "Appy Fizz", "Nescafe", "Bru", "Sunfeast", "Real Juice",
  "Complan", "Boost", "Oreo", "Hide & Seek", "Kinder Joy", "Perk", "Munch", "KitKat", "Amul Milk", "Mother Dairy",
  "Danone", "Yakult", "Bisleri", "Aquafina", "Kinley", "Mirinda", "Limca", "Slice", "Minute Maid", "Paper Boat"
];

// ✅ Generate 100 unique inventory items
const rawData = Array.from({ length: 100 }, (_, i) => {
  const name = productNames[i % productNames.length] + ` ${Math.floor(i / productNames.length) + 1}`;
  return {
    name,
    price: `₹${200 + i * 3}`,
    quantity: `${10 + (i % 30)} Packets`,
    threshold: `${5 + (i % 5)} Packets`,
    expiry: `${(i % 28) + 1}/12/25`,
    status: i % 10 === 0 ? "Low stock" : i % 7 === 0 ? "Out of stock" : "In-stock"
  };
});

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const perPage = 10;

  const filteredData =
    filterStatus === "All"
      ? rawData
      : rawData.filter((item) => item.status === filterStatus);

  const paginatedData = filteredData.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredData.length / perPage);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setPage(1); // reset to first page on filter change
  };

  return (
    <div className="inventory-wrapper">
      <Sidebar />

      <div className="inventory-content">
        <Navbar />
        <main className="inventory-main">

          {/* --- Overview Section --- */}
          <div className="card inventory-summary">
            <div className="summary-box">
              <p className="summary-title blue">Categories</p>
              <h2>14</h2>
              <p className="summary-subtext">Last 7 days</p>
            </div>
            <div className="summary-box">
              <p className="summary-title orange">Total Products</p>
              <h2>868</h2>
              <p className="summary-subtext">₹25000 Revenue</p>
            </div>
            <div className="summary-box">
              <p className="summary-title purple">Top Selling</p>
              <h2>5</h2>
              <p className="summary-subtext">₹2500 Cost</p>
            </div>
            <div className="summary-box">
              <p className="summary-title red">Low Stocks</p>
              <h2>12</h2>
              <p className="summary-subtext">2 Not in stock</p>
            </div>
          </div>

          {/* --- Product Table --- */}
          <div className="card product-table">
            <div className="table-header">
              <h3>Products</h3>
              <div className="table-buttons">
                <button className="btn blue">Add Product</button>

                <select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  className="btn filter-dropdown"
                >
                  <option value="All">All</option>
                  <option value="In-stock">In-stock</option>
                  <option value="Out of stock">Out of stock</option>
                  <option value="Low stock">Low stock</option>
                </select>

                <button className="btn">Download all</button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Buying Price</th>
                  <th>Quantity</th>
                  <th>Threshold Value</th>
                  <th>Expiry Date</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6">No products found.</td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.threshold}</td>
                      <td>{item.expiry}</td>
                      <td className={
                        item.status === "In-stock"
                          ? "green"
                          : item.status === "Out of stock"
                          ? "red"
                          : "orange"
                      }>
                        {item.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* --- Pagination --- */}
            <div className="pagination">
              {totalPages > 1 && (
                <>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="btn"
                  >
                    Previous
                  </button>

                  <span>Page {page} of {totalPages}</span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="btn"
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inventory;