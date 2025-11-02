// Updated DashboardLayout.js
"use client"; // **** so here as made the layout as client component, its children ie, all the pages here would be client component, fix it

import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { useState } from "react";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UserCourseListContext.Provider
      value={{ userCourseList, setUserCourseList }}
    >
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Hidden on mobile by default, always visible on desktop */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="p-10">{children}</div>
          </main>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
