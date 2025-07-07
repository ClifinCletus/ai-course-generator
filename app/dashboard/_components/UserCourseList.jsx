"use client"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

const UserCourseList = () => {

  const [courseList,setCourseList] = useState()
  //from the context UserCourseListContext
  const {UserCourseList,setUserCourseList} = useContext(UserCourseListContext)
  const {user}=useUser()

  useEffect(()=>{
     user&&getUserCourses() //whenever user changes or is present then call this fn to fetch the courses created by the user.
  },[user])

  const getUserCourses= async() =>{
  //to get the courses created by user
  const result = await db.select().from(CourseList)
  .where(eq(CourseList?.createdBy,user?.primaryEmailAddress.emailAddress)) //getting based on the user email id
  console.log(result)
  setCourseList(result)
  setUserCourseList(result); //saving the usercourseslist in the context, so that it can be used through out where its provider is wrapped
}

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'> My Courses</h2>
      <div className='grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          courseList?.map((course,index)=>(
            <CourseCard course={course} key={index} refreshData={()=> getUserCourses()}/>
          ))
        }</div>
    </div>
  )
}

export default UserCourseList