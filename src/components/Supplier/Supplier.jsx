import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Supplier.css";

const Suppliers = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <main className="content-area">
          <h1 className="page-title">Suppliers</h1>
        </main>
      </div>
    </div>
  );
};

export default Suppliers;