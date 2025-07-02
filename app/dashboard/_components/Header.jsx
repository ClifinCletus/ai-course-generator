import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm'>
        <Image src={'/logo.jpeg'} width={40} height={40}/>
        <UserButton/>
    </div>
  ) 
}

export default Header