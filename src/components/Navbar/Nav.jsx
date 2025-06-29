import { Bell } from "lucide-react";
import "./Nav.css"; // Link the CSS file

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Search Bar */}
      <div className="search-bar">
        <svg
          className="search-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5a7.5 7.5 0 010 15z" />
        </svg>
        <input
          type="text"
          placeholder="Search products, suppliers, orders..."
          className="search-input"
        />
      </div>

      {/* Right Side Icons */}
      <div className="right-icons">
        <button className="notification-btn">
          <Bell className="bell-icon" />
          <span className="notification-dot" />
        </button>

        <img
          src="/assets/AdminImage.png"
          alt="Profile"
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;