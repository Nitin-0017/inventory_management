import React, { useState } from "react";
import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Orders.css";

const Orders = () => {
  const ordersPerPage = 10;

  const initialOrders = [
    { product: "Maggi", value: 4306, qty: "43 Packets", id: 7535, date: "11/06/25", status: "Delayed" },
    { product: "Monster", value: 2557, qty: "22 Packets", id: 5724, date: "11/06/25", status: "Confirmed" },
    { product: "Red Bull", value: 4075, qty: "36 Packets", id: 2775, date: "11/06/25", status: "Returned" },
    { product: "Bourn Vita", value: 5052, qty: "14 Packets", id: 2275, date: "11/06/25", status: "Out for delivery" },
    { product: "Horlicks", value: 5370, qty: "5 Packets", id: 2427, date: "11/06/25", status: "Returned" },
    { product: "Harpic", value: 6065, qty: "10 Packets", id: 2578, date: "11/06/25", status: "Out for delivery" },
    { product: "Fanta", value: 4078, qty: "23 Packets", id: 2757, date: "11/06/25", status: "Delayed" },
    { product: "Pepsi", value: 3559, qty: "43 Packets", id: 3757, date: "11/06/25", status: "Confirmed" },
    { product: "Coca cola", value: 2055, qty: "41 Packets", id: 2474, date: "11/06/25", status: "Delayed" },
    { product: "Sprite", value: 3500, qty: "32 Packets", id: 2744, date: "11/06/25", status: "Out for delivery" },
    { product: "Maaza", value: 2550, qty: "20 Packets", id: 2780, date: "11/06/25", status: "Returned" },
    { product: "Appy", value: 3000, qty: "21 Packets", id: 2781, date: "11/06/25", status: "Confirmed" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ product: "", value: "", qty: "", status: "Confirmed" });
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesProduct = order.product.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesProduct && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const openModal = () => {
    setShowModal(true);
    setNewOrder({ product: "", value: "", qty: "", status: "Confirmed" });
  };

  const closeModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = () => {
    const orderToAdd = {
      ...newOrder,
      value: parseInt(newOrder.value),
      id: Math.floor(1000 + Math.random() * 9000),
      date: "11/06/25",
    };
    setOrders([...orders, orderToAdd]);
    setCurrentPage(Math.ceil((orders.length + 1) / ordersPerPage));
    closeModal();
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-body">
          <div className="orders-summary">
            <div className="summary-box blue">
              <h4>Total Orders</h4>
              <p>{orders.length}</p>
              <span>Last 7 days</span>
            </div>
            <div className="summary-box orange">
              <h4>Total Received</h4>
              <p>32<br />₹25000</p>
              <span>Last 7 days</span>
            </div>
            <div className="summary-box purple">
              <h4>Total Returned</h4>
              <p>5<br />₹2500</p>
              <span>Last 7 days</span>
            </div>
            <div className="summary-box red">
              <h4>On the way</h4>
              <p>12<br />₹2356</p>
              <span>Ordered</span>
            </div>
          </div>

          <div className="product-table">
            <div className="table-header">
              <h3>Orders</h3>
              <div className="table-buttons">
                <button className="btn blue" onClick={openModal}>Add Product</button>
                <button className="btn" onClick={() => setShowFilter(!showFilter)}>Filters</button>
                <input
                  type="text"
                  placeholder="Search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="filter-input"
                />
                {showFilter && (
                  <select
                    className="filter-input"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Returned">Returned</option>
                  </select>
                )}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Order Value</th>
                  <th>Quantity</th>
                  <th>Order ID</th>
                  <th>Expected Delivery</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.product}</td>
                    <td>₹{order.value}</td>
                    <td>{order.qty}</td>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td className={
                      order.status === "Confirmed" ? "green" :
                      order.status === "Delayed" ? "orange" :
                      order.status === "Out for delivery" ? "blue" :
                      "red"
                    }>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                className="btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Order</h3>
            <input
              type="text"
              name="product"
              placeholder="Product Name"
              value={newOrder.product}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="value"
              placeholder="Order Value"
              value={newOrder.value}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="qty"
              placeholder="Quantity (e.g. 10 Packets)"
              value={newOrder.qty}
              onChange={handleInputChange}
            />
            <select name="status" value={newOrder.status} onChange={handleInputChange}>
              <option value="Confirmed">Confirmed</option>
              <option value="Delayed">Delayed</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Returned">Returned</option>
            </select>
            <div className="modal-actions">
              <button className="btn blue" onClick={handleAddOrder}>Add</button>
              <button className="btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;