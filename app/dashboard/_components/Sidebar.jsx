"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
  
const Sidebar = () => {
  //getting the usercourses from the context
  const {userCourseList,setUserCourseList}  = useContext(UserCourseListContext)
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

  const path = usePathname(); //to get the pathname(/dashboard/logout) etc, hence to apply proper style for the active one in the sidebar

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md bg-white">
      <Image src={"/logo.jpeg"} width={50} height={60} alt="logo" />
      <hr className="my-5" />

      <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 mt-2 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  item.path === path ? "bg-violet-400 text-white" : ""
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        {/* setting the percentage and count via the length present in the userCourseList */}
        <Progress value={(userCourseList?.length / 5) * 100} className="bg-violet-300"  />
        <h2 className="text-sm my-2">{userCourseList?.length} out of 5 courses created</h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited course generation</h2>
      </div>
    </div>
  );
};

export default Sidebar;
