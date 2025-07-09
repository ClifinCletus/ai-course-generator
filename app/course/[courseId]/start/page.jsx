"use client";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";

//page to show the detailed course, the chaptera at the side, onclick would show the video and other details of the course made from gemini
const CourseStart = ({ params }) => {
  const resolvedParams = use(params);

  //complete course data
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  useEffect(() => {
    if (course?.courseId) {
      GetSelectedChapterContent(0);
    }
  }, [course]);

  console.log("chapterContent:", chapterContent);
  //getting course details by courseId
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, resolvedParams?.courseId));
    console.log(result);
    setCourse(result[0]);
  };
  console.log(selectedChapter);

  //getting the complete details of the chapter
  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, course?.courseId)
        )
      );
    setChapterContent(result[0]);
    console.log("chapter content from db:", result);
  };

  return (
    <div>
      {/* Chapter List side bar */}
      <div className=" fixed overflow-auto md:w-72 md:block hidden h-screen shadow-sm bg-blue-50 border-r">
        <h2 className="font-medium text-lg bg-violet-500 p-4 text-white">
          {course?.courseOutput?.courseName}
        </h2>
        {/* chapters */}
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.chapterName == chapter?.chapterName &&
                "bg-purple-200"
              }`}
              onClick={() => {
                GetSelectedChapterContent(index);
                setSelectedChapter(chapter);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* content div with video and other chapter complete details from gemini */}
      <div className="md:ml-72">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
};

export default CourseStart;
