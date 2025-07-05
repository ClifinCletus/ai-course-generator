"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null); //courseData from db
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState(null);

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
          and( //2 conditions, so and(,)
            eq(CourseList.courseId, courseId), //means courseList.courseId(in db) equals params.courseId (from the params)
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)  // also to confirm, its createdby current user
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

  if (loading) {
    return <div className="flex items-center text-violet-500">Loading course...</div>;
  }

  if (!course) {
    return <div>Course not found or you don't have access to this course.</div>;
  }

  return (

    //displays the courseLayout and we can edit it there
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl"> Course Layout</h2>

      {/* Basic Info */}
    
      <CourseBasicInfo course={course}/> 
       
      {/* Course Detail  */}
      <CourseDetail course={course}/>

      {/* List of Lessons */}
      <ChapterList course={course}/>

      {/* Button to generate course */}

    </div>
  );
};

export default CourseLayout;
