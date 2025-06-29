import Navbar from "../Navbar/Nav";
import Sidebar from "../SlideBar/SlideBar";
import "./Reports.css"; // External stylesheet

const Reports = () => {
  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-body">
          <h1 className="page-heading">Reports</h1>
        </main>
      </div>
    </div>
  );
};

export default Reports;