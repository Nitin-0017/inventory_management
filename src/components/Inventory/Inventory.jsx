import Navbar from "../Navbar/Nav.jsx";
import Sidebar from "../SlideBar/SlideBar";
import './Inventory.css';

const Inventory = () => {
  return (
    <div className="inventory-wrapper">
      <Sidebar />

      <div className="inventory-content">
        <Navbar />
        <main className="inventory-main">
          {/* Inventory content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Inventory;