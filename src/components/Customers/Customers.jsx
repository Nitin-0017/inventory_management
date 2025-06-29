import React, { useState, useMemo } from "react";
import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Customers.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialCustomers = [
  { id: "C101", name: "Aman Kumar", phone: "9876543210", email: "aman@example.com", product: "Maggi", date: "2025-06-11", amount: 4306 },
  { id: "C102", name: "Neha Sharma", phone: "9988776655", email: "neha@example.com", product: "Fanta", date: "2025-06-12", amount: 2500 },
  { id: "C103", name: "Ravi Yadav", phone: "9900112233", email: "ravi@example.com", product: "Bourn Vita", date: "2025-06-13", amount: 5052 },
  { id: "C104", name: "Tanya Jain", phone: "9123456789", email: "tanya@example.com", product: "Pepsi", date: "2025-06-14", amount: 3559 },
  { id: "C105", name: "Rakesh Singh", phone: "9012345678", email: "rakesh@example.com", product: "Sprite", date: "2025-06-15", amount: 3500 },
  { id: "C106", name: "Sneha Patil", phone: "9345612789", email: "sneha@example.com", product: "Appy", date: "2025-06-16", amount: 3000 },
  { id: "C107", name: "Manoj Das", phone: "9876501234", email: "manoj@example.com", product: "Red Bull", date: "2025-06-17", amount: 4075 },
  { id: "C108", name: "Priya Mehta", phone: "9123456789", email: "priya@example.com", product: "Maaza", date: "2025-06-18", amount: 2550 },
  { id: "C109", name: "Rahul Kapoor", phone: "9988776644", email: "rahul@example.com", product: "Monster", date: "2025-06-19", amount: 2557 },
  { id: "C110", name: "Kiran Verma", phone: "9321456789", email: "kiran@example.com", product: "Horlicks", date: "2025-06-20", amount: 5370 }
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    product: "",
    date: "",
    amount: ""
  });

  const customersPerPage = 10;

  const filtered = useMemo(() => {
    return customers.filter(
      (c) =>
        (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.product.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterProduct === "" || c.product === filterProduct)
    );
  }, [customers, searchQuery, filterProduct]);

  const totalPages = Math.ceil(filtered.length / customersPerPage);

  const paginatedCustomers = useMemo(() => {
    return filtered.slice(
      (currentPage - 1) * customersPerPage,
      currentPage * customersPerPage
    );
  }, [filtered, currentPage]);

  const openEditModal = (index) => {
    const fullIndex = (currentPage - 1) * customersPerPage + index;
    setEditingIndex(fullIndex);
    setNewCustomer({ ...customers[fullIndex] });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const fullIndex = (currentPage - 1) * customersPerPage + index;
    const updated = [...customers];
    updated.splice(fullIndex, 1);
    setCustomers(updated);
  };

  const handleAddOrUpdate = () => {
    const { id, name, phone, email, product, date, amount } = newCustomer;

    if (!id || !name || !phone || !email || !product || !date || !amount) {
      alert("Please fill all fields.");
      return;
    }

    const newEntry = { id, name, phone, email, product, date, amount: parseFloat(amount) };

    if (editingIndex !== null) {
      const updated = [...customers];
      updated[editingIndex] = newEntry;
      setCustomers(updated);
    } else {
      setCustomers((prev) => [...prev, newEntry]);
    }

    setNewCustomer({ id: "", name: "", phone: "", email: "", product: "", date: "", amount: "" });
    setEditingIndex(null);
    setShowModal(false);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <main className="content-area">
          <h1 className="page-title">Customers</h1>

          <div className="supplier-table">
            <div className="table-header">
              <input
                type="text"
                placeholder="Search customer or product"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <div className="table-buttons">
                <select
                  className="btn"
                  value={filterProduct}
                  onChange={(e) => {
                    setFilterProduct(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Products</option>
                  {[...new Set(customers.map((c) => c.product))].map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>

                <button
                  className="btn blue"
                  onClick={() => {
                    setEditingIndex(null);
                    setNewCustomer({ id: "", name: "", phone: "", email: "", product: "", date: "", amount: "" });
                    setShowModal(true);
                  }}
                >
                  Add Customer
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Amount Paid</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((c, i) => (
                  <tr key={i}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.email}</td>
                    <td>{c.product}</td>
                    <td>{c.date}</td>
                    <td>₹{c.amount}</td>
                    <td className="actions-column">
                      <FaEdit
                        className="icon edit-icon"
                        onClick={() => openEditModal(i)}
                      />
                      <FaTrash
                        className="icon delete-icon"
                        onClick={() => handleDelete(i)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p>Page {currentPage} of {totalPages}</p>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{editingIndex !== null ? "Edit Customer" : "Add New Customer"}</h2>
            <input
              type="text"
              placeholder="Customer ID"
              value={newCustomer.id}
              onChange={(e) => setNewCustomer({ ...newCustomer, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Product"
              value={newCustomer.product}
              onChange={(e) => setNewCustomer({ ...newCustomer, product: e.target.value })}
            />
            <input
              type="date"
              value={newCustomer.date}
              onChange={(e) => setNewCustomer({ ...newCustomer, date: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount Paid"
              value={newCustomer.amount}
              onChange={(e) => setNewCustomer({ ...newCustomer, amount: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleAddOrUpdate}>
                {editingIndex !== null ? "Update" : "Add"}
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;