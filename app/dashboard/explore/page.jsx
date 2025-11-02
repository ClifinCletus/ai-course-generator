"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const [courseList, setCourseList] = useState();
  //to show the set of courses created by all the users, one page contains 10 courses, on clicking next prev etc, traverses between these set of courses
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    //calling it on initial load
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    //here, taken the complete courses. heredone pagination, on each time on the click of next, would get next 10 courses.
    const result = await db
      .select()
      .from(CourseList)
      .limit(9)
      .offset(pageIndex * 9);
    setCourseList(result);
    console.log(result);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore more projects</h2>
      <p>Explore more project build with AI by other users</p>

      <div className="grid max-sm:grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courseList?.map((course, index) => (
          <div>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        {pageIndex != 0 && (
          <Button
            className="bg-violet-500 text-white"
            onClick={() => setPageIndex(pageIndex - 1)}
          >
            Previous Page
          </Button>
        )}
        <Button
          className="bg-violet-500 text-white"
          omClick={() => setPageIndex(pageIndex + 1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Explore;
