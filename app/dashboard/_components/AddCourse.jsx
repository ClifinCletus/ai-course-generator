"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl">
          Hello,
          <span className="font-bold">{user?.fullName}</span>
        </h2> 
        <p className="text-sm text-grey-500"> create new course with AI, Share with friends. </p>
      </div> 
      <Link href={'/create-course'}>
      <Button className='bg-violet-500 cursor-pointer'>+ Create AI Course</Button>
      </Link>
    </div>
  );
};

export default AddCourse;
