import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

const TopicDescription  = () => {
    const {userCourseInput,setUserCourseInput} = useContext(UserInputContext)
    
    const handleInputChange = (fieldName,value) =>{ //to set topic and desc along with its value. so here done as : we sent the topic/desc alomg with its value here, then store it
        //fieldName: topic or desc, value:its value
       setUserCourseInput(prev=>({
        ...prev, 
        [fieldName]: value
       }))
    }
  
    return (
    <div className='mx-20 lg:mx-44'> 
        {/* Input Topic */}
        <div className='mt-5'>
            <label>
                💡Write the topic for which you want to generate a Course (eg: Python Course, Yoga, etc)
            </label>
            <Input placeholder={'Topic'} className='h-14 text-xl'
            defaultValue={userCourseInput?.topic}
           onChange={(e)=> handleInputChange('topic',e.target.value)}/> 
        </div>

        {/* Text Area Description */}

        <div className='mt-5'>
            <label>
               📑Tell us more about the course what you want to include in the courde
            </label>
            <Textarea placeholder="About your course" className='h-24 text-xl'
            defaultValue={userCourseInput?.description}
            onChange={(e)=> handleInputChange('description',e.target.value)}/>
        </div>
    </div>
  )
}

export default TopicDescription 