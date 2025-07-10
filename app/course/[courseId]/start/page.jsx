//page.jsx
"use client";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineArrowLeft, HiOutlineHome } from "react-icons/hi2";
import { useRouter } from "next/navigation";

//page to show the detailed course, the chapters at the side, onclick would show the video and other details of the course made from gemini
const CourseStart = ({ params }) => {
  const resolvedParams = use(params);
  const router = useRouter();

  //complete course data
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleChapterSelect = (chapter, index) => {
    GetSelectedChapterContent(index);
    setSelectedChapter(chapter);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
    console.log("chapter", chapter);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden gap-2 fixed top-0 left-0 right-0 z-50 bg-violet-500 p-4 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
        <h2 className="font-medium text-sm text-white truncate">
          {course?.courseOutput?.courseName}
        </h2>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-white p-1 hover:bg-violet-600 rounded-md transition-colors"
        >
          <HiOutlineHome size={20} />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chapter List Sidebar */}
      <div
        className={`
          fixed md:relative z-50 md:z-auto
          w-80 md:w-72 h-full
          bg-blue-50 border-r shadow-lg md:shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          overflow-y-auto
        `}
      >
        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="bg-violet-500 p-4 flex items-center justify-between">
            <h2 className="font-medium text-lg text-white">
              {course?.courseOutput?.courseName}
            </h2>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-white p-1 hover:bg-violet-600 rounded-md transition-colors"
              title="Back to Dashboard"
            >
              <HiOutlineHome size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Header Inside Sidebar */}
        <div className="md:hidden bg-violet-500 p-4 flex items-center justify-between">
          <h2 className="font-sm text-lg text-white">
            {course?.courseOutput?.courseName}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-white p-1 hover:bg-violet-600 rounded-md transition-colors"
              title="Back to Dashboard"
            >
              <HiOutlineHome size={20} />
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white"
            >
              <HiOutlineXMark size={24} />
            </button>
          </div>
        </div>

        {/* Chapters */}
        <div className="pb-4">
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 transition-colors ${
                selectedChapter?.chapterName == chapter?.chapterName &&
                "bg-purple-200"
              }`}
              onClick={() => handleChapterSelect(chapter, index)}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
};

export default CourseStart;
