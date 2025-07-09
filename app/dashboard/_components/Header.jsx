// Header.js
"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import React from "react";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="bg-white shadow-sm flex justify-between items-center p-5">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>
      
      {/* Desktop - hide hamburger menu */}
      <div className="hidden md:block"></div>
      
      <UserButton />
    </div>
  );
};

export default Header;