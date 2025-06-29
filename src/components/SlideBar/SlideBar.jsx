import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Boxes, BarChart2, Users, Package, ClipboardList, User, Database, Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './SlideBar.css';


const menuItems = [
  { label: 'Dashboard', icon: <Home />, path: '/dashboard' },
  { label: 'Inventory', icon: <Boxes />, path: '/inventory' },
  { label: 'Reports', icon: <BarChart2 />, path: '/reports' },
  { label: 'Suppliers', icon: <Users />, path: '/suppliers' },
  { label: 'Orders', icon: <Package />, path: '/orders' },
  { label: 'Manage Store', icon: <ClipboardList />, path: '/manage-store' },
  { label: 'Customers', icon: <User />, path: '/customers' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemMasterOpen, setItemMasterOpen] = useState(
    location.pathname.includes('/item-master')
  );

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar-container">
      <div>
        <div className="sidebar-logo">
          <img src="/assets/fullLogo.png" alt="Countrees Logo" />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(({ label, icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Collapsible Item Master */}
          <button
            onClick={() => setItemMasterOpen(!itemMasterOpen)}
            className={`sidebar-link collapsible ${
              location.pathname.includes('/item-master') ? 'active' : ''
            }`}
          >
            <div className="collapsible-header">
              <Database className="icon" />
              <span>Item Master</span>
            </div>
            {itemMasterOpen ? <ChevronUp className="chevron" /> : <ChevronDown className="chevron" />}
          </button>

          <div className={`submenu ${itemMasterOpen ? 'open' : ''}`}>
            {[
              { label: "Added Items List", path: "/item-master/already-added-items" },
              { label: "Add Item", path: "/item-master/add-item" },
              { label: "Add Category", path: "/item-master/add-category" },
              { label: "Add Sub Category", path: "/item-master/add-sub-category" },
            ].map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `submenu-link ${isActive ? 'submenu-active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'active' : ''}`
          }
        >
          <Settings className="icon" />
          <span>Settings</span>
        </NavLink>
        <button onClick={handleLogout} className="sidebar-link">
          <LogOut className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;