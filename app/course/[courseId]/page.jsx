"use client";

import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../../create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "../../create-course/[courseId]/_components/CourseDetail";
import ChapterList from "../../create-course/[courseId]/_components/ChapterList";
import Header from "@/app/dashboard/_components/Header";

//page to show the each course particular details

const Course = ({ params }) => {
  const {courseId}= use(params)
  const [course, setCourse] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [courseId]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, courseId));
    setCourse(result[0]);
    console.log(result);
  };

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        {/* edit={false} to make the edit button removed here and the hidefile to hide upload file */}
        <CourseBasicInfo course={course} edit={false} fileUpload={false}/> 
        <CourseDetail course={course} />

        <ChapterList course={course} edit={false}/>
      </div>
    </div>
  );
};

export default Course;
