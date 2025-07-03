"use client"

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import getCourseLayout from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";

const CreateCourse = () => {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ]; // for the steppers

  const [activeIndex,setActiveIndex] = useState(0) //to set the active stepper. when the next button is clicked, moves to next stepper, hence implements using the index of the stepper
  const [loading,setLoading] = useState(false)
  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext)
  
  //added to look the values in the userCourse Input when it changes
  useEffect(()=>{
    console.log(userCourseInput)
  },[userCourseInput])

  /**
   * To check Next button inabled or disabled based on if the values in the page are filled or selected, then only can move to next page.
   ** */
  const checkStatus = () => {
    if(userCourseInput?.length == 0){
      return true
    }
    if(activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)){
      return true
    }
    if(activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined || userCourseInput?.description?.length == 0)){
      return true
    }
    else if(activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter == undefined )){
      return true
    }

    return false
     
  }

  const GenerateCourseLayout = async() =>{
    setLoading(true)
    const BASIC_PROMPT = "Generate a Course Tutorial on The Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration: ";
    const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapter}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT 
    console.log(FINAL_PROMPT)
    try {
        // Call the AI model function with the generated prompt
        const courseLayout = await getCourseLayout(FINAL_PROMPT);
        console.log('Generated Course Layout:', courseLayout);
        console.log(JSON.parse(courseLayout))
        
        // You can now use the courseLayout data
        // For example, set it to state or return it
        return courseLayout;
        
    } catch (error) {
        console.error('Error generating course layout:', error);
        throw error;
    }finally{
      setLoading(false)
    }
  } 
  
  return (
    <div>
      {/* Steppers (category, topic, options)*/}

      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl !text-violet-400 font-medium">
          {" "}
          Create Course
        </h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div className={`bg-gray-200 p-3 rounded-full text-white
                    ${activeIndex>= index && 'bg-violet-500'}`}> 
                    {/*here, sets the steppers which are completed till now to another color(done using the index here(simple, just add the current index and style the current and all the before index steppers, so to understand these steppers are completed)) */}
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {/*the line between the steppers. here done condition to avoid showing the last line after third stepper. also added the proper index style to show which are completed*/}
              {index != StepperOptions.length-1 && (
                <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex-1 >= index && '!bg-purple-500'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

    <div className="px-10 md:px-20 lg:px-44 mt-10">
      {/* Component (corresponding component of each steeper)*/}
          {activeIndex == 0 ? <SelectCategory/> : activeIndex == 1 ? <TopicDescription/> : <SelectOption/>}
      {/* Next Previous btns */}
      <div className="flex justify-between mt-10">
        <Button disabled={activeIndex == 0} variant='outline' className="bg-violet-500" onClick={()=>setActiveIndex(activeIndex-1)}> Previous</Button>
        { //to hide on last stepper
        activeIndex < 2 && <Button disabled={checkStatus()} className="bg-violet-500" onClick={()=>setActiveIndex(activeIndex+1)}> Next</Button>
        }
        { //show the button to create the course, when reached the last stepper
            activeIndex == 2 &&  <Button disabled={checkStatus()} className='bg-violet-500' onClick={()=>GenerateCourseLayout()}> Generate Course Layout</Button>
        }
      </div>
    </div>
   <LoadingDialog loading={loading}/>
    </div>
  );
};

export default CreateCourse;
