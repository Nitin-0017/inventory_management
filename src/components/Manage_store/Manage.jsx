
import Sidebar from "../SlideBar/SlideBar";
import Navbar from "../Navbar/Nav";
import "./Manage.css"; // Link to external CSS

const ManageStore = () => {
  return (
    <div className="manage-store">
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="content-area">
            ManageStore
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManageStore;