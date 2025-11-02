"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

/**
 * 🔹 The misconception

Many people think:

“The provider is for setting values and the consumer is just for reading them.”

That’s half true, but incomplete.

🔹 The truth

When you do this in your layout:

<UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
  {children}
</UserCourseListContext.Provider>


You’re not just providing a value — you’re literally passing down an object { userCourseList, setUserCourseList } to every descendant that calls useContext(UserCourseListContext).

That means the child doesn’t get a copy of those — it gets the exact same references (the same state variable and the same setter function) that live in the layout.

🔹 Why the child can update it

The crucial thing is this line:

const [userCourseList, setUserCourseList] = useState([]);


setUserCourseList is a function that updates the state stored inside the layout component.

When you pass it through context:

<UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>


you’re saying, “Here’s my state and the function that can mutate it.”

Now, anywhere down the tree, when you do:

const { setUserCourseList } = useContext(UserCourseListContext);
setUserCourseList(newValue);


you’re calling the same function that the parent got from its useState.
So React goes up, updates the parent’s state, re-renders the parent (and provider), and all consumers get the new value.

🔹 Key insight

The context itself doesn’t store state — it just provides a reference to something (in this case, the parent’s state and setter).
That’s why any consumer can both read and write if the provider shares the setter.

If the provider only shared a value like { userCourseList } (without the setter), then consumers could only read, not update.
 */

const UserCourseList = () => {
  const [courseList, setCourseList] = useState();
  //from the context UserCourseListContext
  const { UserCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const { user } = useUser();

  useEffect(() => {
    user && getUserCourses(); //whenever user changes or is present then call this fn to fetch the courses created by the user.
  }, [user]);

  const getUserCourses = async () => {
    //to get the courses created by user
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress)); //getting based on the user email id
    console.log(result);
    setCourseList(result);
    setUserCourseList(result); //saving the usercourseslist in the context, so that it can be used through out where its provider is wrapped
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl"> My Courses</h2>
      <div className="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getUserCourses()} // to refresh and get as if new courses added
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default UserCourseList;
