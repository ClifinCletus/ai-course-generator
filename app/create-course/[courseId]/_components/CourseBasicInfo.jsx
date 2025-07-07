import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
//import {ref, uploadBytes} from 'firebase/storage';
//import {storage} from '@/configs/firebaseConfig'

const CourseBasicInfo = ({
  course,
  refreshData,
  edit = true,
  fileUpload = true,
}) => {
  // const [selectedFile,setSelectedFile] = useState()
  // //fn to handle uploading the image of course from the user to firebase
  // const onFileSelected = async(event) =>{
  //   const file = event.target.files[0] // to select the correct file
  // // Get the first file selected by the user from the file input
  // // Create a temporary URL representing the selected image file
  // // Set the selected file as a preview URL for the image
  // setSelectedFile(URL.createObjectURL(file))
  // const fileName = Date.now()+file+'.jpg' //creating a unique name to the file
  //  const storageRef=ref(storage,fileName)
  //  await uploadBytes(storageRef,file)
  //  .then((snapshot)=>{
  //     console.log('file upload complete')
  //  } )
  // }

  const [selectedFile, setSelectedFile] = useState();
  //const [uploading, setUploading] = useState(false);

  useEffect(() => {
    //whenever the course changes(changes may be image),set the selectedFile as the image in the course from db
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  // Direct upload to Cloudinary (requires upload preset)
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      //setUploading(true);
      setSelectedFile(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "course-images");

      // Direct upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Cloudinary upload complete:", result);

      // Use result.secure_url for the image URL
      console.log(result.secure_url);

      //updating url to db
      await db
        .update(CourseList)
        .set({
          courseBanner: result.secure_url,
        })
        .where(eq(CourseList.id, course?.id));

      // Save to your database
      // await saveCourseImage(course.id, result.secure_url);

      if (refreshData) {
        refreshData(true);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* for showing the editable courseTitle and about course */}
        <div>
          <h2 className="font-bold text-3xl ">
            {course?.courseOutput?.courseName}
            {/* only show this button on certain pages, so passed this via component call to look if needed there */}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
            {/* the dialog which triggers on clicking this, to edit the basic info on the courseLayout */}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center color-violet-500">
            {" "}
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
          <Button className="w-full mt-5 bg-violet-500">Start</Button>
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              alt="dummy_image"
              src={
                selectedFile
                  ? selectedFile
                  : course?.courseBanner
                  ? course.courseBanner
                  : "/placeholder.webp"
              }
              width={300}
              height={300}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>
          {/* to upload custom image from user for the course ,hide it in certain pages*/}
          {fileUpload && (
            <div>
              <h3 className="text-gray-500">Upload course image file</h3>
              <input
                type="file"
                id="upload-image"
                className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100
                              mt-3
                          "
                onChange={onFileSelected}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
