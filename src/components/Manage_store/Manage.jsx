import React, { useState } from "react";
import Sidebar from "../SlideBar/SlideBar";
import Navbar from "../Navbar/Nav";
import "./Manage.css";

const initialStores = [
  {
    branch: "Main Branch",
    store: "Lisy Store",
    address: "1A/Indira Nagar, 3rd street",
    city: "Mumbai - 6313403",
    phone: "044-653578",
  },
  {
    branch: "Saket Colony Branch",
    store: "Lisy Store",
    address: "54 Saket colony, 3rd street",
    city: "Mumbai - 63133452",
    phone: "044-653763",
  },
  {
    branch: "Gaandipuram Branch",
    store: "Lisy Store",
    address: "32/ Venkatasamy layout, 3rd street sulur",
    city: "Mumbai - 6313403",
    phone: "044-653578",
  },
];

const ManageStore = () => {
  const [stores, setStores] = useState(initialStores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalType, setModalType] = useState("edit"); // 'edit' or 'add'

  const [formData, setFormData] = useState({
    branch: "",
    store: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setModalType("edit");
    setFormData({ ...stores[index] });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setModalType("add");
    setFormData({
      branch: "",
      store: "",
      address: "",
      city: "",
      phone: "",
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (modalType === "edit") {
      const updatedStores = [...stores];
      updatedStores[editIndex] = formData;
      setStores(updatedStores);
    } else {
      setStores([...stores, formData]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="manage-store">
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="content-area">
            <div className="manage-header">
              <h2>Manage Store</h2>
              <button className="add-store-btn" onClick={handleAddClick}>
                Add Store
              </button>
            </div>

            <div className="store-list">
              {stores.map((store, index) => (
                <div className="store-card" key={index}>
                  <div className="branch-name">{store.branch}</div>
                  <div className="store-right">
                    <div className="store-details">
                      <p><strong>{store.store}</strong></p>
                      <p>{store.address}</p>
                      <p>{store.city}</p>
                      <p>{store.phone}</p>
                    </div>
                    <button className="edit-btn" onClick={() => handleEditClick(index)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Modal for Add + Edit */}
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>{modalType === "edit" ? "Edit Store" : "Add New Store"}</h3>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="Branch Name"
                  />
                  <input
                    type="text"
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                    placeholder="Store Name"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                  <div className="modal-buttons">
                    <button onClick={handleSave} className="save-btn">
                      Save
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManageStore;