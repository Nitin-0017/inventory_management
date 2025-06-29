import { useState } from "react";
import Sidebar from "../SlideBar/SlideBar";
import Navbar from "../Navbar/Nav";
import "./Settings.css";

const Settings = () => {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    expiryAlert: false,
  });

  const [users] = useState([
    { id: 1, name: "Admin User", role: "Admin", email: "admin@example.com" },
    { id: 2, name: "Store Manager", role: "Manager", email: "manager@example.com" },
  ]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    alert("Company profile saved");
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-body">
          <h2 className="page-heading">Settings</h2>

          {/* Company Profile */}
          <section className="card-section">
            <h3 className="card-heading">Company Profile</h3>
            <form onSubmit={handleCompanySubmit} className="form-grid">
              {["name", "email", "phone", "address"].map((field, idx) => (
                <div className="form-group" key={idx}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    name={field}
                    value={company[field]}
                    onChange={handleCompanyChange}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div className="form-button">
                <button type="submit">Save Profile</button>
              </div>
            </form>
          </section>

          {/* Notifications */}
          <section className="card-section">
            <h3 className="card-heading">Notifications</h3>
            <div className="notification-options">
              <div className="notification-row">
                <span>Low Stock Alert</span>
                <input
                  type="checkbox"
                  checked={notifications.lowStock}
                  onChange={() => handleNotificationToggle("lowStock")}
                />
              </div>
              <div className="notification-row">
                <span>Expiry Date Alert</span>
                <input
                  type="checkbox"
                  checked={notifications.expiryAlert}
                  onChange={() => handleNotificationToggle("expiryAlert")}
                />
              </div>
            </div>
          </section>

          {/* User Roles */}
          <section className="card-section">
            <h3 className="card-heading">User Roles</h3>
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;