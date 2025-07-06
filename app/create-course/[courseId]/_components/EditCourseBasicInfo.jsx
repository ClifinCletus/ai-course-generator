import React, { useEffect, useState } from "react";
import {
  //dialog component for showing the edit section
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

const EditCourseBasicInfo = ({course,refreshData}) => {

  const [courseName,setCourseName] = useState()
  const [description,setDescription] = useState()


  //******** V IMP *********** */
  //here done in a way that, sometimes, we may not edit the description or the courseName, would edit only anyone of these, at that time, 
  // the other's value would be empty because, that would be also empty in the useState, as we are not updating it that time. hence, it would be added as empty value in the db. 
  //hence, whenever the value in the course changes, we would set both the courseName and description as per the current value available(edited or before edited, whatever is the current value(may be edited or not))
  useEffect(()=>{
    setCourseName(course?.courseOutput?.courseName)
    setDescription(course?.courseOutput?.description)
  },[course])

  const onUpdateHandler = async () =>{
    //updating the course details directly here (no need to add ? here as we are assigning values to this field)
    course.courseOutput.CourseName = courseName
    course.courseOutput.Description = description
    //here updating the db with the new courseOutput
    const result = await db.update(CourseList).set({
      courseOutput: course.courseOutput
    }).where(eq(CourseList?.id,course?.id)) // to update  the current course properly
  .returning({id:CourseList.id}) // to return the updated content's id only 

    //console.log('updated with BasicInfo',course)
    console.log("updated in db",result)

    refreshData(true)  //toshow the update fast on the screen without refreshing screen(via its parents, call the GetCourse() to get the data from db, hence would get faster updates)
  }

  return (
    <Dialog>
        {/* this is the trigger to open the dialog, hence, we are replacing it with the edit icon, so that on clicking the edit icon in the page, this dialog opens up and we can edit.
        this would be the one visible hence(edit icon (HiPencilSquare)), so just need to import this dialog and just use it anywhere needed, there only shows the edit icon */}
      <DialogTrigger className='ml-2'>
        <HiPencilSquare/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title and Description</DialogTitle>
          <DialogDescription>
            <div>
              <label>Course Title</label>
              <Input onChange={(e)=> setCourseName(e.target.value)} defaultValue={course?.courseOutput?.courseName}/>
            </div>
            <div>
              <label>Course Description</label>
              <Textarea onChange={(e)=> setDescription(e.target.value)} className='h-40' defaultValue={course?.courseOutput?.description}/>
            </div>
          </DialogDescription>
        </DialogHeader>
        {/* to close the dialog and hence adding changes */}
        <DialogFooter>
          <DialogClose> 
            <Button className='bg-violet-500'
            onClick={onUpdateHandler}> Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
