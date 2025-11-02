"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";

const AddCourse = () => {
  const { user } = useUser(); //to access the name of the logged in user
  //context. here its used to change the generate course button when the 5 courses are created. done to make users take the upgrade option and upgrade the plan
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl">
          Hello,
          <span className="font-bold text-2xl">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-grey-500">
          {" "}
          create new course with AI, Share with friends.{" "}
        </p>
      </div>

      {/* here navigates to the upgrade page when the user have created 5 courses(to upgrade the plan) */}
      <Link
        href={userCourseList >= 5 ? "/dashboard/upgrade" : "/create-course"}
      >
        <Button className="bg-violet-500 cursor-pointer">
          + Create AI Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
