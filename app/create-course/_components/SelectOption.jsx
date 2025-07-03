import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

//used shadcn select

const SelectOption = () => {
  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext)

  const handleInputChange = (fieldName,value) =>{
       setUserCourseInput(prev=>({
        ...prev, 
        [fieldName]: value
       }))
    }

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">🎓 Difficulty Level</label>

          {/*can use the inbuilt onValueChange in the shadcn Select to auto change in the selected value */}
          <Select onValueChange={value => handleInputChange('level', value)}
            defaultValue={userCourseInput?.level}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">⏳ Course Duration</label>
          <Select onValueChange={value => handleInputChange('duration', value)}
            defaultValue={userCourseInput?.duration}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm"> ▶️ Add Video in the course</label>
          <Select onValueChange={value => handleInputChange('displayVideo', value)}
            defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Hours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div> 
          <label className="text-sm">🔢 No.of Chapters Needed</label>
          <Input type='number' onChange={(e)=> handleInputChange('noOfChapter',e.target.value)}
          defaultValue={userCourseInput?.noOfChapter}/>
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
