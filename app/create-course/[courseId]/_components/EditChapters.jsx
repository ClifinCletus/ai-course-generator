import React, { useEffect, useState } from "react";
import {
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

// ******* VVIMP ******* : used to edit a chapter content (name and about)
// here its used to show like in the courseBasic component, we would show this with the edit icon  and we may edit this 
// here, its input and textarea based on that we edit and then when edited, we would update it on the db first, then on the refresh fn call, we can see the new one with edited data

const EditChapters = ({ course, index, refreshData }) => {
  //to access current chapter easily
  const currentCourseOutputChapter = course?.courseOutput?.chapters[index];

  const [name, setChapterName] = useState();
  const [about, setChapterAbout] = useState();

  useEffect(() => {
    setChapterName(currentCourseOutputChapter.chapterName);
    setChapterAbout(currentCourseOutputChapter.about);
  }, [currentCourseOutputChapter]);

 //***** VV IMP  *******/
 //udpating the edited content on the db and calling the refresh fn

  const onUpdateHandler = async () => {
    course.courseOutput.Chapters[index].chapterName = name;
    course.courseOutput.Chapters[index].about = about;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id)); // to update  the current course properly

      refreshData(true) //toshow the update fast on the screen without refreshing screen(via its parents, call the GetCourse() to get the data from db, hence would get faster updates)
    console.log("updated chapter course", course);
    console.log(result)
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <HiPencilSquare />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter {index + 1} </DialogTitle>
            <DialogDescription>
              <div>
                <label>Course Title</label>
                <Input
                  onChange={(e) => setChapterName(e.target.value)}
                  defaultValue={currentCourseOutputChapter.chapterName}
                />
              </div>
              <div>
                <label>Course Description</label>
                <Textarea
                  onChange={(e) => setChapterAbout(e.target.value)}
                  className="h-40"
                  defaultValue={currentCourseOutputChapter.about}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          {/* to close the dialog and hence adding changes */}
          <DialogFooter>
            <DialogClose>
              <Button className="bg-violet-500" onClick={onUpdateHandler}>
                {" "}
                Update
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditChapters;
