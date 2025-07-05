import React from "react";
import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineClock, HiOutlinePlayCircle } from "react-icons/hi2";

const CourseDetail = ({ course }) => {
  return (
    <div className="border p-6 rounded-xl mt-3 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-violet-500" />
          <div>
            <h2 className="text-xs text-gray-500-">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiOutlineClock className="text-4xl text-violet-500" />
          <div>
            <h2 className="text-xs text-gray-500-">Duration</h2>
            {/* check it if correct */}
            <h2 className="font-medium text-lg">{course?.courseOutput?.TotalDuration}</h2>
          </div>
        </div>
        
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-4xl text-violet-500" />
          <div>
            <h2 className="text-xs text-gray-500-">No. Of Chapters</h2>
            <h2 className="font-medium text-lg">{course?.courseOutput?.NoOfChapters}</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiOutlinePlayCircle className="text-4xl text-violet-500" />
          <div>
            <h2 className="text-xs text-gray-500-">Video Included?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
