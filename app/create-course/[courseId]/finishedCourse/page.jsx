import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";

const FinishScreen = () => {
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
       <CourseBasicInfo course={course} refreshData={()=>console.log()}/>
    </div>
  );
};

export default FinishScreen;
