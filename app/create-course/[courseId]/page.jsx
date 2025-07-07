"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import LoadingDialog from "./_components/LoadingDialog";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import {getChapterContent_AI} from '@/configs/AiModel'
import YT_Service from '@/configs/YT_Service'
import { useRouter } from "next/navigation";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null); //courseData from db
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState(null);

  const router = useRouter()

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

  // if (loading) {
  //   return <div className="flex items-center text-violet-500">Loading course...</div>;
  // }

  if (!course) {
    return <div>Course not found or you don't have access to this course.</div>;
  }

  //to create the final chapters from gemini
  const GenerateChapterContentFromAI = async () =>{
    setLoading(true)
    const chapters = course?.courseOutput?.chapters
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Explain the Concept in Detail on Topic:${course.name},Chapter:${chapter.chapterName}, in JSON format with list of array with field as title,explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable`
      console.log(PROMPT)
      
        try{
          let videoIdYt=''; // we only need the video id of the yt video to show and use it as video 

             //creating chapters detailed using gemini
            const chapterLayout = await getChapterContent_AI(PROMPT);
            console.log('Generated Chapter Layout:', chapterLayout);
            const chapterContent =JSON.parse(chapterLayout) 
            console.log(chapterContent)

            //***** generate video URL 
            // Await the YT_Service.getVideos to get the videoId before inserting
            // Remove "Chapter X:" prefix from chapterName if present
            // Remove "Chapter X:" or "Chapter X -" or "Chapter X." prefix from chapterName if present
            const cleanedChapterName = chapter?.chapterName.replace(/^Chapter\s*\d+[:\.\-\s]*/i, '').trim();
            let ytResp = await YT_Service.getVideos(`${course?.name}: ${cleanedChapterName}`);
            console.log('yt video prompt:', course?.name + ':' + chapter?.chapterName)
            console.log(ytResp);
            videoIdYt = ytResp[0]?.id?.videoId;
            console.log('videoId', videoIdYt);

            //Save Chapter content + Video URL
            await db.insert(Chapters).values({
              chapterId: index,
              courseId: course?.courseId,
              content: chapterContent,
              videoId:videoIdYt
            }) 

        }catch(err){
             console.log("error in chapter",err)
        }finally{
          setLoading(false)
        }
        console.log(course?.courseId)
        // to set the course as published after its creation 
        await db.update(CourseList).set({
          published:true
        })
        //after creating all the chapters, go to the new page where all chapters are listed
        router.replace('/create-course/' + course?.courseId + '/finishedCourse')
      }
    )}

  return (

    //displays the courseLayout and we can edit it there
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl"> Course Layout</h2>

      <LoadingDialog loading={loading}/>
      {/* Basic Info */}
    
      <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/> 
       
      {/* Course Detail  */}
      <CourseDetail course={course}/>

      {/* List of Lessons */}
      <ChapterList course={course} refreshData={()=>GetCourse()}/>

      {/* Button to generate course */}
      <Button onClick={GenerateChapterContentFromAI} className="bg-violet-500 my-10"> Generate Course Content</Button>

    </div>
  );
};

export default CourseLayout;
