import React, { useState } from "react";
import Navbar from "../Navbar/Nav.jsx";
import Sidebar from "../SlideBar/SlideBar.jsx";
import "./Inventory.css";

// Sample product data (10+ items for pagination)
const initialProductData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: i % 2 === 0 ? "Electronics" : "Clothing",
  quantity: Math.floor(Math.random() * 100),
  status: i % 3 === 0 ? "Low Stock" : i % 3 === 1 ? "In Stock" : "Out of Stock",
}));

const Inventory = () => {
  const [products, setProducts] = useState(initialProductData);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    status: "In Stock",
  });

  const handleAddProduct = () => {
  if (!newProduct.name || !newProduct.category || !newProduct.quantity) {
    alert("Please fill all fields");
    return;
  }

  const newEntry = {
    id: products.length + 1,
    ...newProduct,
  };

  setProducts([...products, newEntry]); // Add to end
  setNewProduct({ name: "", category: "", quantity: "", status: "In Stock" });
  setShowModal(false);

  // Move to last page
  setCurrentPage(Math.ceil((products.length + 1) / productsPerPage));
};

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.status === filter);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="inventory-wrapper">
      <Sidebar />
      <div className="inventory-content">
        <Navbar />
        <main className="inventory-main">
         

          {/* Summary Boxes */}
          <div className="inventory-summary">
            <div className="summary-box blue">
              <div className="summary-title">Total Products</div>
              <div className="summary-subtext">{products.length}</div>
            </div>
            <div className="summary-box orange">
              <div className="summary-title">Low Stock</div>
              <div className="summary-subtext">
                {products.filter((p) => p.status === "Low Stock").length}
              </div>
            </div>
            <div className="summary-box purple">
              <div className="summary-title">In Stock</div>
              <div className="summary-subtext">
                {products.filter((p) => p.status === "In Stock").length}
              </div>
            </div>
            <div className="summary-box red">
              <div className="summary-title">Out of Stock</div>
              <div className="summary-subtext">
                {products.filter((p) => p.status === "Out of Stock").length}
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="product-table">
            <div className="table-header">
              <button className="btn blue" onClick={() => setShowModal(true)}>
                + Add Product
              </button>
              <select
                className="filter-dropdown"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td className={product.status === "In Stock" ? "green" : product.status === "Low Stock" ? "orange" : "red"}>
                      {product.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                className="btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
            <select
              value={newProduct.status}
              onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn blue" onClick={handleAddProduct}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;