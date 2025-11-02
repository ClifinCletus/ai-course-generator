// Sidebar.js
"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
import {
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // Getting the usercourses from the context
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiOutlineHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <HiOutlineShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <HiOutlinePower />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  /*****  VVV IMP  ******/
  // Configuration for course limits
  const maxCourses = 5;
  const currentCourseCount = userCourseList?.length || 0;
  const progressPercentage = Math.min(
    (currentCourseCount / maxCourses) * 100,
    100
  );

  // Close sidebar when clicking on a menu item on mobile
  const handleMenuItemClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById("sidebar");
        const hamburger = document.querySelector(
          '[aria-label="Close sidebar"], [aria-label="Open sidebar"]'
        );

        //means there is sidebar and the event not happened on sidebar or hamburger icon (means it happened on the mobilescreen outsied the sidebar)
        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          !hamburger?.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed md:static h-full w-64 p-5 shadow-md bg-white z-50 transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Logo Section */}
        <Link href="/dashboard" onClick={handleMenuItemClick}>
          <div className="flex items-center space-x-3 group mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-200 transition-all duration-300">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-white" />
                <div className="absolute -top-3 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AI Course Generator
              </h1>
              <p className="text-xs text-gray-500">Powered by AI</p>
            </div>
          </div>
        </Link>

        <hr className="my-5" />

        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-2">
            {Menu.map((item) => (
              <li key={item.id}>
                <Link href={item.path} onClick={handleMenuItemClick}>
                  <div
                    className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg transition-colors duration-200 ${
                      item.path === path
                        ? "bg-violet-400 text-white hover:bg-violet-500 hover:text-white"
                        : ""
                    }`}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <h2 className="font-medium">{item.name}</h2>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Progress Section */}
        <div className="absolute bottom-10 left-5 right-5">
          <Progress
            value={progressPercentage}
            className="bg-violet-300 mb-2"
            aria-label={`Course creation progress: ${currentCourseCount} out of ${maxCourses} courses created`}
          />
          <h2 className="text-sm my-2 font-medium">
            {currentCourseCount} out of {maxCourses} courses created
          </h2>
          <h2 className="text-xs text-gray-500">
            Upgrade your plan for unlimited course generation
          </h2>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
