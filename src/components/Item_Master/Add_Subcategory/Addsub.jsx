import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../Navbar/Nav";
import Sidebar from "../../SlideBar/SlideBar";
import "./Addsub.css";

const AddSubCategory = () => {
  const [categories] = useState([
    "Electronics", "Furniture", "Supplies", "Raw Materials", "Clothing",
    "Books", "Home Appliances", "Toys", "Beauty Products", "Groceries",
    "Tools & Hardware", "Footwear", "Sports Equipment"
  ]);

  const [subCategories, setSubCategories] = useState([
    { category: "Furniture", sub: "Desks" },
    { category: "Furniture", sub: "Chairs" },
    { category: "Supplies", sub: "Pens" },
    { category: "Supplies", sub: "Notebooks" },
    { category: "Raw Materials", sub: "Wood Planks" },
    { category: "Raw Materials", sub: "Steel Rods" },
    { category: "Electronics", sub: "Monitors" },
    { category: "Electronics", sub: "Smartphones" },
    { category: "Electronics", sub: "Laptops" },
    { category: "Electronics", sub: "Headphones" },
    { category: "Clothing", sub: "T-Shirts" },
    { category: "Clothing", sub: "Jeans" },
    { category: "Books", sub: "Science Fiction" },
    { category: "Books", sub: "History" },
    { category: "Home Appliances", sub: "Refrigerators" },
    { category: "Home Appliances", sub: "Microwaves" },
    { category: "Toys", sub: "Building Blocks" },
    { category: "Toys", sub: "Dolls" },
    { category: "Beauty Products", sub: "Face Creams" },
    { category: "Beauty Products", sub: "Lipsticks" },
    { category: "Groceries", sub: "Rice" },
    { category: "Groceries", sub: "Pulses" },
    { category: "Tools & Hardware", sub: "Hammer" },
    { category: "Tools & Hardware", sub: "Screwdrivers" },
    { category: "Footwear", sub: "Sneakers" },
    { category: "Footwear", sub: "Formal Shoes" },
    { category: "Sports Equipment", sub: "Cricket Bats" },
    { category: "Sports Equipment", sub: "Football" }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = subCategoryName.trim();
    if (!selectedCategory || !trimmed) return alert("Both fields are required.");
    const exists = subCategories.some(sc => sc.category.toLowerCase() === selectedCategory.toLowerCase() && sc.sub.toLowerCase() === trimmed.toLowerCase());
    if (exists) return alert("Subcategory already exists in this category.");

    setSubCategories(prev => [...prev, { category: selectedCategory, sub: trimmed }]);
    setSubCategoryName("");
    setSelectedCategory("");
  };

  const handleEdit = (index) => {
    const current = subCategories[index];
    const newSub = prompt(`Edit Sub Category for "${current.category}":`, current.sub);
    if (!newSub) return;
    const trimmed = newSub.trim();
    if (!trimmed) return alert("Name cannot be empty");

    const exists = subCategories.some((sc, i) =>
      i !== index &&
      sc.category.toLowerCase() === current.category.toLowerCase() &&
      sc.sub.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) return alert("That name already exists.");

    const updated = [...subCategories];
    updated[index].sub = trimmed;
    setSubCategories(updated);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setSubCategories(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="subcat-wrapper">
      <Sidebar />
      <div className="subcat-content">
        <Navbar />
        <main className="subcat-main">
          <h1 className="subcat-heading">Sub Category Master</h1>

          <div className="form-container">
            <h2 className="form-title">Add Sub Category</h2>
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-field">
                <label>Category Name*</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select Name</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Sub Category Name*</label>
                <input type="text" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} placeholder="Enter Sub Category Name" />
              </div>

              <div className="form-button">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Sub Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{entry.category}</td>
                    <td>{entry.sub}</td>
                    <td>
                      <div className="action-btns">
                        <button onClick={() => handleEdit(idx)} title="Edit"><Pencil className="icon edit" /></button>
                        <button onClick={() => handleDelete(idx)} title="Delete"><Trash2 className="icon delete" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSubCategory;