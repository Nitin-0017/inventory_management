import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../SlideBar/SlideBar";
import Navbar from "../../Navbar/Nav";
import "./ItemMaster.css";

const initialFormState = {
  itemName: "", itemCode: "", category: "", subCategory: "", brand: "", dateAdded: "",
  specification: "", uom: "", openingStock: "", openingStockDate: "", minStock: "",
  unitPrice: "", gstRate: ""
};

const subCategoryOptions = {
  Electronics: ["Mobile Phones", "Laptops", "Headphones", "TVs"],
  Furniture: ["Sofas", "Tables", "Chairs", "Beds"],
  Clothing: ["T-Shirts", "Jeans", "Jackets"],
  Groceries: ["Fruits", "Vegetables", "Snacks"],
  Books: ["Novels", "Textbooks", "Comics"],
  "Tools & Hardware": ["Drills", "Hammers", "Screwdrivers"]
};

const ItemMaster = () => {
  const [form, setForm] = useState(initialFormState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setForm((prev) => ({ ...prev, category: value, subCategory: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => setForm(initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get existing items from localStorage
    const existingItems = JSON.parse(localStorage.getItem("items")) || [];

    // ✅ Append new item
    const updatedItems = [...existingItems, form];

    // ✅ Save updated list back to localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));

    alert("Item Submitted!");
    navigate("/item-master/already-added-items");
  };

  return (
    <div className="item-wrapper">
      <Sidebar />
      <div className="item-content">
        <Navbar />
        <main className="item-main">
          <h2 className="item-heading">Add Item Master</h2>

          {/* Item Info */}
          <section className="form-section">
            <h3 className="form-section-title">Item Info</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Item Name</label>
                <input name="itemName" value={form.itemName} onChange={handleChange} placeholder="Enter item name" />
              </div>
              <div className="form-field">
                <label>Item Code</label>
                <input name="itemCode" value={form.itemCode} onChange={handleChange} placeholder="Enter item code" />
              </div>
              <div className="form-field">
                <label>Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Enter brand name" />
              </div>
              <div className="form-field">
                <label>Date Added</label>
                <input name="dateAdded" value={form.dateAdded} onChange={handleChange} type="date" />
              </div>
              <div className="form-field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="" disabled>Select Category</option>
                  {Object.keys(subCategoryOptions).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Sub Category</label>
                <select name="subCategory" value={form.subCategory} onChange={handleChange}>
                  <option value="" disabled>Select Sub Category</option>
                  {subCategoryOptions[form.category]?.map((subCat, idx) => (
                    <option key={idx} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>
              <div className="form-field full-width">
                <label>Specification</label>
                <textarea name="specification" value={form.specification} onChange={handleChange} placeholder="Enter specification..." />
              </div>
            </div>
          </section>

          {/* UOM */}
          <section className="form-section">
            <h3 className="form-section-title">Unit of Measurement</h3>
            <div className="form-field half-width">
              <label>Select UOM</label>
              <select name="uom" value={form.uom} onChange={handleChange}>
                <option value="" disabled>Select UOM</option>
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="ltr">Litres</option>
                <option value="box">Box</option>
              </select>
            </div>
          </section>

          {/* Stock Details */}
          <section className="form-section">
            <h3 className="form-section-title">Stock Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Opening Stock</label>
                <input name="openingStock" value={form.openingStock} onChange={handleChange} type="number" placeholder="Enter opening stock" />
              </div>
              <div className="form-field">
                <label>Opening Stock Date</label>
                <input name="openingStockDate" value={form.openingStockDate} onChange={handleChange} type="date" />
              </div>
              <div className="form-field full-width">
                <label>Minimum Stock Level</label>
                <input name="minStock" value={form.minStock} onChange={handleChange} type="number" placeholder="Enter minimum stock level" />
              </div>
            </div>
          </section>

          {/* Price Details */}
          <section className="form-section">
            <h3 className="form-section-title">Price Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Unit Price</label>
                <input name="unitPrice" value={form.unitPrice} onChange={handleChange} type="number" placeholder="Enter unit price" />
              </div>
              <div className="form-field">
                <label>GST Rate (%)</label>
                <input name="gstRate" value={form.gstRate} onChange={handleChange} type="number" placeholder="Enter GST rate" />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="form-buttons">
            <button onClick={handleReset} className="reset-btn">Reset</button>
            <button onClick={handleSubmit} className="submit-btn">Submit</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemMaster;