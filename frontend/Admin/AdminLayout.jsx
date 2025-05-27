import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
