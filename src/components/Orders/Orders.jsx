import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Orders.css"; // Link your CSS file

const Orders = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-body">
          <h1 className="page-heading">Orders</h1>
        </main>
      </div>
    </div>
  );
};

export default Orders;