import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from "./EditChapters";

//we are not passing edit, only setting edit=true here so as to make the editchapters visible.(because, in other places we would reuse this component without edit)
const ChapterList = ({ course, refreshData, edit = true }) => {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-violet-500 flex-none h-10 w-10 text-white text-center rounded-full p-2">
                {index + 1}
              </h2>
              <div>
                {/* to edit the proper chapter, we passed the index hence to find it */}
                <h2 className="font-medium text-lg">
                  {chapter?.chapterName}
                  {/* to hide the edit icon in certain pages */}
                  {edit && (
                    <EditChapters
                      index={index}
                      course={course}
                      refreshData={() => refreshData(true)}
                    />
                  )}
                </h2>
                <p className="text-sm tex-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 mt-3 text-violet-400 items-center text-sm">
                  {" "}
                  <HiOutlineClock /> {chapter?.duration} minutes
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
