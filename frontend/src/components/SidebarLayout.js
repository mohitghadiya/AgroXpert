import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar  
        yes="bg-green-100 text-green-800" 
        no="hover:bg-gray-100 text-gray-700"
        open={sidebarOpen} onClose={() => setSidebarOpen(false)} 
      />
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center p-2 bg-white shadow sticky top-0 z-30">
          {/* <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl text-green-700 focus:outline-none"
            aria-label="Open sidebar"
          > */}
            {/* <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button> */}
          {/* <span className="ml-3 font-bold text-green-800 text-lg">KrishiXpert</span> */}
        </div>
        <div className="p-2 md:p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarLayout;