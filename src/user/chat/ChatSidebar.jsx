import React from 'react'
import { about } from '../../assets'

const ChatSidebar = () => {
  return (
<div className='mx-12 w-96 '>
    <p className=' font-montserrat font-semibold text-[30px]  mt-16'>Recent Chats</p>
    <div className='w-96 hover:bg-[#A9252533] rounded-lg py-3  mt-5 bg-[#FCFCFC]'>
        <span className='flex justify-around '>
          <span> <img src={about} alt="profile" className='rounded-full w-16 h-16' /></span> 
          <span className='flex flex-col'>
            <p className='text-[#2E2E2E] font-montserrat font-semibold '>ABCD</p>
            <p className='font-thin'>Dummy Message</p>
          </span>
          <span className='font-extralight'>
            23:00 PM
          </span>
        </span>
    </div>
</div>
  )
}

export default ChatSidebar