import React from 'react'
import { HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi2'

const ChapterList = ({course}) => {
  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl'>Chapters</h2>
        <div className='mt-2'>
          {
            course?.courseOutput?.Chapters.map((chapter,index)=>(
            <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
                <div className='flex gap-5 items-center'>
                    <h2 className='bg-violet-500 flex-none h-10 w-10 text-white text-center rounded-full p-2'>{index+1}</h2> 
                    <div>
                        <h2 className='font-medium text-lg'>{chapter?.ChapterName}</h2>
                        <p className='text-sm tex-gray-500'>{chapter?.about}</p>
                        <p className='flex gap-2 mt-3 text-violet-500 items-center text-sm'> <HiOutlineClock/> {chapter?.Duration}</p>
                    </div>
                </div>
                <HiOutlineCheckCircle className='text-4xl text-gray-300 flex-none'/>
            </div>

            ))
          }
        </div>
    </div>
  )
}

export default ChapterList