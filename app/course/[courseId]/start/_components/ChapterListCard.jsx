import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'

const ChapterListCard = ({chapter,index}) => {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b overflow-auto'>
        <div>
          <h2 className='bg-violet-500 p-1 w-8 h-8 rounded-full text-white text-center'>{index+1}</h2>
        </div>
        {/* out of 5 columns assigning 4 columns to this div */}
        <div className='col-span-4'>  
             <h2 className='font-medium'>{chapter.chapterName}</h2>
             <h2 className='flex items-center gap-2 text-lg text-violet-500'><HiOutlineClock/>{chapter?.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard