import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Navbar from "../../Navbar/Nav.jsx";
import Sidebar from "../../SlideBar/SlideBar";
import './Add_Cat.css';

const AddCategory = () => {
  const [categories, setCategories] = useState([
    "Electronics", "Furniture", "Supplies", "Raw Materials",
    "Clothing", "Books", "Home Goods", "Groceries", "Tools & Hardware",
  ]);
  const [name, setName] = useState("");

  const isDuplicate = (test, skipIdx = -1) =>
    categories.some((cat, i) => i !== skipIdx && cat.toLowerCase() === test.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    if (isDuplicate(trimmed)) return alert("Category already exists!");

    setCategories((prev) => [...prev, trimmed]);
    setName("");
  };

  const handleEdit = (idx) => {
    const current = categories[idx];
    const updated = prompt("Edit category name:", current);
    if (updated === null) return;
    const trimmed = updated.trim();
    if (!trimmed) return alert("Category name cannot be empty!");
    if (isDuplicate(trimmed, idx)) return alert("That name already exists!");

    setCategories((prev) => prev.map((cat, i) => (i === idx ? trimmed : cat)));
  };

  const handleDelete = (idx) => {
    if (!window.confirm("Delete this category?")) return;
    setCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="category-wrapper">
      <Sidebar />
      <div className="category-content">
        <Navbar />
        <main className="category-main">
          <h1 className="page-heading">Item Master</h1>

          {/* Add Category Form */}
          <div className="form-container">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>

          {/* Category Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{cat}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(idx)} title="Edit">
                          <Pencil className="edit-icon" />
                        </button>
                        <button onClick={() => handleDelete(idx)} title="Delete">
                          <Trash2 className="delete-icon" />
                        </button>
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

export default AddCategory;