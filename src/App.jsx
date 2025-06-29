import { Routes, Route } from 'react-router-dom';

// Auth
import LogIn from './components/Login/Login.jsx';
import SignUp from './components/Signup/Signup.jsx';

// Dashboard & Pages
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Inventory from './components/Inventory/Inventory.jsx';
import Reports from './components/Reports/Reports.jsx';
import Suppliers from './components/Supplier/Supplier.jsx';
import Orders from './components/Orders/Orders.jsx';
import ManageStore from './components/Manage_store/Manage.jsx';
import Customers from './components/Customers/Customers.jsx';
import Settings from './components/Settings/Settings.jsx';

// Item Master
import Added_Items from './components/Item_Master/Added_item/Addeditem.jsx';
import ItemMaster from './components/Item_Master/Add_item/ItemMaster.jsx';
import AddCategory from './components/Item_Master/Add_Category/Add_Cat.jsx';
import AddSubCategory from './components/Item_Master/Add_Subcategory/Addsub.jsx';

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* Main Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/manage-store" element={<ManageStore />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/settings" element={<Settings />} />

      {/* Item Master Routes */}
      <Route path="/item-master/already-added-items" element={<Added_Items />} />
      <Route path="/item-master/add-item" element={<ItemMaster />} />
      <Route path="/item-master/add-category" element={<AddCategory />} />
      <Route path="/item-master/add-sub-category" element={<AddSubCategory />} />
    </Routes>
  );
};

export default App;