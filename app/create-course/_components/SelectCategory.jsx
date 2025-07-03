import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared_items/CategoryList";
import Image from "next/image";
import { useContext } from "react";

const SelectCategory = () => {
  //using the context to add the user selected inputs
  const {userCourseInput,setUserCourseInput} = useContext(UserInputContext)

  const handleCategoryChange = (category)=>{
    setUserCourseInput(prev => ({
      ...prev, category:category
    }))
  }
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5"> Select the Course Category </h2>
      <div className="grid grid-cols-3 gap-10 ">
        {CategoryList.map((item, index) => (
          <div
            className={`flex flex-col p-5 border items-center
                rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer ${userCourseInput?.category == item.name && 'border-violet-300 bg-blue-50'}`} //to highlight the selected category
            key={item.id}
            onClick={()=>handleCategoryChange(item.name)}
          >
            <Image
              src={item.icon}
              width={60}
              height={60}
              className="rounded-lg"
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
