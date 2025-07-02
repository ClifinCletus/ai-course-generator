"use client";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HiOutlineHome,
  HiOutlinePower,
  HiOutlineShieldCheck,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";

const Sidebar = () => {
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
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/logo.jpeg"} width={50} height={60} alt="logo" />
      <hr className="my-5" />

      <ul>
        {Menu.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`flex items-ce nter gap-2 text-gray-600 p-3 mt-2 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                item.path == path && "bg-violet-400 text-white" 
              }`} //set to find the current active element and add style to it
            >
              {/*style to set active one */}
              <div className="text-2xl">
                {/*this icon would work like a text, hence provide text like styles */}
                {item.icon}
              </div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33}/>
        <h2 className="text-sm my-2"> 3 out of 5 courses created</h2>
        <h2 className="text-sx test-gray-500"> Upgrade your plan for unlimited course generation</h2>
      </div>
    </div>
  );
};

export default Sidebar;
