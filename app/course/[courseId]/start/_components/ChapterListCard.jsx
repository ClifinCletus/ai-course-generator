//ChapterListCard.jsx
import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div className='flex items-center p-4 border-b hover:bg-purple-50 transition-colors'>
      {/* Chapter Number */}
      <div className='flex-shrink-0 mr-3 sm:mr-4'>
        <h2 className='bg-violet-500 p-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white text-center flex items-center justify-center text-sm sm:text-base font-medium'>
          {index + 1}
        </h2>
      </div>
      
      {/* Chapter Details */}
      <div className='flex-1 min-w-0'>
        <h2 className='font-medium text-sm sm:text-base mb-1 truncate pr-2'>
          {chapter.chapterName}
        </h2>
        <div className='flex items-center gap-1 sm:gap-2 text-violet-500'>
          <HiOutlineClock className='w-4 h-4 flex-shrink-0' />
          <span className='text-xs sm:text-sm'>{chapter?.duration}</span>
        </div>
      </div>
    </div>
  )
}

export default ChapterListCard