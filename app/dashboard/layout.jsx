//for the complete layout of our dashboard
'use client'
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { UserCourseListContext } from "../_context/UserCourseListContext";
import { useState } from "react";

function DashboardLayout({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);

  // context to get the count of courses created, to show in the progress bar in the sidebar and other places
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      <div>
        <div className="md:w-64 hidden md:block">
          {/*show for md and above, hide for other screen sizes */}
          <Sidebar />
        </div>

        <div className="md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </div>
    </UserCourseListContext.Provider>
  );
}

export default DashboardLayout;
