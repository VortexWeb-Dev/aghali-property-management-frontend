import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useSearchParams } from 'react-router-dom';
import { Menu, X, Eye, Building2, WalletCards, Users2, Wrench, ListPlus, ShoppingCart } from 'lucide-react';
import PropertiesPage from './pages/Properties'
import Property from './components/Property';
import AddProperty from './components/AddProperty';
import AddListing from './components/AddListing';
import Contacts from './pages/Contacts';
import { stats,links } from './dummyData/data';
import Sidebar from './components/SideBar'
import Dashboard from './components/Dashboard';
import AccountingPage from './pages/AccountingPage';
import MaintenancePage from './pages/Maintenances';
import ListingsPage from './pages/Listings';
import Navbar from './components/Navbar';




const StatCard = ({ icon: Icon, title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="p-3 bg-gray-100 rounded-full w-fit">
      <Icon className="w-6 h-6 text-gray-600" />
    </div>
    <h3 className="text-2xl font-bold mt-4">{value}</h3>
    <p className="text-gray-600">{title}</p>
    <p className={`mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '↑' : '↓'} {Math.abs(change)}%
    </p>
  </div>
);


const PlaceholderPage = ({ title }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">{title}</h2>
    <p className="mt-4 text-gray-600">This is a placeholder for the {title} page.</p>
  </div>
);


const PropertyResolver = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(id); // Log the id value to debug what it returns

  if (!id) {
    return (
      <>
        <PropertiesPage />
      </>
    );
  }

  return (
    <>
      <Property id={id} />
    </>
  );
};


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <div className="h-screen sticky top-0 overflow-y-hidden">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
        </div>
        
        <main className="flex-1 overflow-x-hidden">
          <Navbar/>
          
          <div className="md:hidden p-4 bg-white shadow-md">
            <button onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<PropertyResolver />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/accounting" element={<AccountingPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/listings" element={< ListingsPage/>} />
            <Route path="/listings/add" element={<AddListing />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;