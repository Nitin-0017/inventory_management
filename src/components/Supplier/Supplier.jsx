import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Supplier.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialSuppliers = [
  { name: "Rohan Naik", product: "Saffola", contact: "9867545457", email: "rohan@gmail.com", date: "2025-06-01", review: 4.5 },
  { name: "Nirav Patel", product: "Maaza", contact: "9867545368", email: "nirav@gmail.com", date: "2025-05-24", review: 4 },
  { name: "Aniket Deshmukh", product: "Dairy Milk", contact: "9867545566", email: "aniket@gmail.com", date: "2025-05-24", review: 2.5 },
  { name: "Sneha Sharma", product: "Pepsi", contact: "9876543210", email: "sneha@gmail.com", date: "2025-06-02", review: 4.2 },
  { name: "Amit Verma", product: "Bingo", contact: "8765432109", email: "amit@gmail.com", date: "2025-06-03", review: 3.8 },
  { name: "Priya Desai", product: "Sunfeast", contact: "7654321098", email: "priya@gmail.com", date: "2025-06-04", review: 3.2 },
  { name: "Vikas Jha", product: "Maggie", contact: "6543210987", email: "vikas@gmail.com", date: "2025-06-05", review: 4.6 },
  { name: "Kavita Iyer", product: "Sprite", contact: "5432109876", email: "kavita@gmail.com", date: "2025-06-06", review: 2.9 },
  { name: "Saurabh Singh", product: "Frooti", contact: "4321098765", email: "saurabh@gmail.com", date: "2025-06-07", review: 4.1 },
  { name: "Deepa Joshi", product: "Thums Up", contact: "3210987654", email: "deepa@gmail.com", date: "2025-06-08", review: 4.9 },
  { name: "Rahul Mehta", product: "Lays", contact: "2109876543", email: "rahul@gmail.com", date: "2025-06-09", review: 3.5 },
  { name: "Alok Yadav", product: "Good Day", contact: "1987654321", email: "alok@gmail.com", date: "2025-06-10", review: 2.8 },
  { name: "Sanya Kapoor", product: "Mirinda", contact: "1234567890", email: "sanya@gmail.com", date: "2025-06-11", review: 4.7 },
  { name: "Vivek Chauhan", product: "Oreo", contact: "1345678901", email: "vivek@gmail.com", date: "2025-06-12", review: 3.6 },
  { name: "Megha Sharma", product: "Parle-G", contact: "1456789012", email: "megha@gmail.com", date: "2025-06-13", review: 4.3 },
  { name: "Karan Dey", product: "Minute Maid", contact: "1567890123", email: "karan@gmail.com", date: "2025-06-14", review: 4.0 },
  { name: "Ritu Jain", product: "Kurkure", contact: "1678901234", email: "ritu@gmail.com", date: "2025-06-15", review: 3.1 },
  { name: "Tarun Malik", product: "Coke", contact: "1789012345", email: "tarun@gmail.com", date: "2025-06-16", review: 4.8 },
  { name: "Neha Saxena", product: "Red Bull", contact: "1890123456", email: "neha@gmail.com", date: "2025-06-17", review: 3.9 },
  { name: "Arjun Das", product: "Hide & Seek", contact: "1901234567", email: "arjun@gmail.com", date: "2025-06-18", review: 2.6 },
  { name: "Simran Kohli", product: "Slice", contact: "2012345678", email: "simran@gmail.com", date: "2025-06-19", review: 4.4 },
  { name: "Manish Goyal", product: "Appy", contact: "2123456789", email: "manish@gmail.com", date: "2025-06-20", review: 4.2 },
  { name: "Avni Shah", product: "Limca", contact: "2234567890", email: "avni@gmail.com", date: "2025-06-21", review: 3.7 },
  { name: "Raghav Rathi", product: "Bournvita", contact: "2345678901", email: "raghav@gmail.com", date: "2025-06-22", review: 3.3 },
  { name: "Tanvi Bansal", product: "Boost", contact: "2456789012", email: "tanvi@gmail.com", date: "2025-06-23", review: 4.6 },
  { name: "Harshit Rana", product: "Cheetos", contact: "2567890123", email: "harshit@gmail.com", date: "2025-06-24", review: 4.1 },
  { name: "Jaya Menon", product: "Oats", contact: "2678901234", email: "jaya@gmail.com", date: "2025-06-25", review: 3.0 },
  { name: "Mohit Sinha", product: "Nescafe", contact: "2789012345", email: "mohit@gmail.com", date: "2025-06-26", review: 4.5 },
  { name: "Ishita Roy", product: "Tropicana", contact: "2890123456", email: "ishita@gmail.com", date: "2025-06-27", review: 4.0 },
  { name: "Aditya Gupta", product: "Perk", contact: "2901234567", email: "aditya@gmail.com", date: "2025-06-28", review: 3.2 }
];


const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [scrollToLast, setScrollToLast] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    product: "",
    contact: "",
    email: "",
    date: "",
    review: ""
  });

  const suppliersPerPage = 10;

  const filtered = useMemo(() => {
    return suppliers.filter(
      (s) =>
        (s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.product.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filterProduct === "" || s.product === filterProduct)
    );
  }, [suppliers, searchQuery, filterProduct]);

  const totalPages = Math.ceil(filtered.length / suppliersPerPage);

  const paginatedSuppliers = useMemo(() => {
    return filtered.slice(
      (currentPage - 1) * suppliersPerPage,
      currentPage * suppliersPerPage
    );
  }, [filtered, currentPage]);

  useEffect(() => {
    if (scrollToLast) {
      setCurrentPage(totalPages);
      setScrollToLast(false);
    }
  }, [scrollToLast, totalPages]);

  const openEditModal = (index) => {
    const fullIndex = (currentPage - 1) * suppliersPerPage + index;
    setEditingIndex(fullIndex);
    setNewSupplier({ ...suppliers[fullIndex] });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const fullIndex = (currentPage - 1) * suppliersPerPage + index;
    const updated = [...suppliers];
    updated.splice(fullIndex, 1);
    setSuppliers(updated);
    if ((currentPage - 1) * suppliersPerPage >= updated.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddOrUpdate = () => {
    const { name, product, contact, email, date, review } = newSupplier;
    const parsedReview = parseFloat(review);

    if (!name || !product || !contact || !email || !date || isNaN(parsedReview)) {
      alert("Please fill all fields and enter a valid review.");
      return;
    }

    const newEntry = { name, product, contact, email, date, review: parsedReview };

    if (editingIndex !== null) {
      const updated = [...suppliers];
      updated[editingIndex] = newEntry;
      setSuppliers(updated);
    } else {
      setSuppliers((prev) => [...prev, newEntry]);
      setScrollToLast(true);
    }

    setNewSupplier({
      name: "",
      product: "",
      contact: "",
      email: "",
      date: "",
      review: ""
    });
    setEditingIndex(null);
    setShowModal(false);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <main className="content-area">
          <h1 className="page-title">Suppliers</h1>

          <div className="supplier-table">
            <div className="table-header">
              <input
                type="text"
                placeholder="Search supplier or product"
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
                  {[...new Set(suppliers.map((s) => s.product))].map((p, i) => (
                    <option key={i} value={p}>{p}</option>
                  ))}
                </select>

                <button
                  className="btn blue"
                  onClick={() => {
                    setEditingIndex(null);
                    setNewSupplier({ name: "", product: "", contact: "", email: "", date: "", review: "" });
                    setShowModal(true);
                  }}
                >
                  Add Supplier
                </button>
                <button className="btn">Download all</button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Product</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Last Supplied Date</th>
                  <th>Supplier Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((s, i) => (
                  <tr key={i}>
                    <td>{s.name}</td>
                    <td>{s.product}</td>
                    <td>{s.contact}</td>
                    <td>{s.email}</td>
                    <td>{s.date}</td>
                    <td className={
                      s.review >= 4 ? "green" : s.review >= 3 ? "orange" : "red"
                    }>
                      {s.review}/5
                    </td>
                    <td className="actions-column">
                      <FaEdit
                        className="icon edit-icon"
                        title="Edit"
                        onClick={() => openEditModal(i)}
                      />
                      <FaTrash
                        className="icon delete-icon"
                        title="Delete"
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
            <h2>{editingIndex !== null ? "Edit Supplier" : "Add New Supplier"}</h2>
            <input
              type="text"
              placeholder="Supplier Name"
              value={newSupplier.name}
              onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Product"
              value={newSupplier.product}
              onChange={(e) => setNewSupplier({ ...newSupplier, product: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={newSupplier.contact}
              onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newSupplier.email}
              onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
            />
            <input
              type="date"
              value={newSupplier.date}
              onChange={(e) => setNewSupplier({ ...newSupplier, date: e.target.value })}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Review (e.g. 4.5)"
              value={newSupplier.review}
              onChange={(e) => setNewSupplier({ ...newSupplier, review: e.target.value })}
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

export default Suppliers;