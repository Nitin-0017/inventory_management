import Navbar from "../NavBar/Nav.jsx";
import Sidebar from "../SlideBar/SlideBar";
import './Customers.css';

const Customers = () => {
  return (
    <div className="customers-wrapper">
      <Sidebar />

      <div className="customers-content">
        <Navbar />
        <main className="customers-main">
          Customers
        </main>
      </div>
    </div>
  );
};

export default Customers;