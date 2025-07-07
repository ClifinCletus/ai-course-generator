"use client"

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const FinishScreen = ({params}) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null); //courseData from db
  const [courseId, setCourseId] = useState(null);

  const router = useRouter();

  // Handle async params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params; //taken the params using await(its latest syntax)
      setCourseId(resolvedParams.courseId);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (courseId && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [courseId, user]);

  const GetCourse = async () => {
    try {
      //to get the course layout from db using the createdUSer and the courseid
      const result = await db
        .select()
        .from(CourseList) //to select using the tablename
        .where(
          and(
            //2 conditions, so and(,)
            eq(CourseList.courseId, courseId), //means courseList.courseId(in db) equals params.courseId (from the params)
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress) // also to confirm, its createdby current user
          )
        );

      console.log("Course data:", result);
      setCourse(result[0] || null);
    } catch (error) {
      console.error("Error fetching course:", error);
    } 
}


  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
        <h2 className="text-center font-bold text-2xl my-3 text-violet-500">Congrats, Your course is ready!!</h2>
       

       {/* as our course is now ready, just doing as to show the previous build courseinfo, just to show its ready */}
       <CourseBasicInfo course={course} refreshData={()=>console.log()}/>

        {/* link of our course */}
        <h2 className="mt-3">Course URL</h2>
        <h2 className='text-center text-gray-400 mt-2 border p-3 round flex gap-5 items-center'>
          {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
          <HiOutlineClipboardDocumentCheck
            className="h-6 w-6 cursor-pointer"
            onClick={async () => await
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
              )
            }
          />
        </h2>
    </div>
  );
};

export default FinishScreen;
