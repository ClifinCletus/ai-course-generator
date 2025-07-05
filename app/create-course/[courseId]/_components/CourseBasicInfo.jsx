import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";

const CourseBasicInfo = ({ course }) => {
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* for showing the editable courseTitle and about course */}
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.CourseName}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.Description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center color-violet-500">
            {" "}
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          <Button className="w-full mt-5 bg-violet-500">Start</Button>
        </div>
        <div>
          <Image
            src={"/placeholder.webp"}
            width={300}
            height={300}
            className="w-full rounded-xl h-[250px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
