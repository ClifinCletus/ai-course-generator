import Image from "next/image";
import React from "react";
import { HiMiniEllipsisVertical, HiOutlineBookOpen } from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";
import Link from "next/link";

//card to show each course
const CourseCard = ({ course,refreshData }) => {
  //fn to delete the course

  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({id:CourseList?.id})
 
      if(resp){ //if delete success, fast refresh
        refreshData(true)
      }

  };


  return (
    <div
      className="shadow-sm rounded-lg flex flex-col gap-1 border p-2  
    hover:scale-105 transition-all cursor-pointer mt-4"
    >
      <Link href={`/course/${course?.courseId}`}>
      <Image
        src={course?.courseBanner}
        width={300}
        height={200}
        className="w-full h-[200px] object-cover rounded-lg"
      />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.courseName}
          <DropdownOption handleonDelete={() => handleOnDelete()}>
            {" "}
            {/* for the delete functionality */}
            <HiMiniEllipsisVertical />{" "}
            {/*sending this as a children for triggering dropdown */}
          </DropdownOption>
        </h2>
        <p className="text-sm text-gray-400">{course.category}</p>
        <div className="flex items-center justify-between pt-2 max-sm:gap-2">
          <h2 className="flex gap-2 items-center p-2 rounded-sm bg-purple-50 text-sm text-violet-600">
            <HiOutlineBookOpen />
            {course?.courseOutput?.noOfChapters} Chapters
          </h2>
          <h2 className="text-sm bg-purple-50 text-violet-600 p-2 rounded-sm">
            {course?.level}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
