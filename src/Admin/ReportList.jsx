import React from 'react'
import Nav from './Nav'

const ReportList = () => {
  return (
  <>
     <span className='absolute'>
    <Nav/>
  </span>
  <p className='font-semibold text-[28px] ml-72 pt-20'>Pending Approval List</p>
     <ul className=" bg-[#F0F0F0] text-[15px] py-7  flex flex-row justify-around items-center mx-10 ml-72 gap-2  rounded-lg mt-8 h-[6vh] text-black font-medium">
        <li className="w-[2%] px-20">S.No</li>
        <li className="w-[36%] px-80 text-center">Reports</li>
      

      </ul>


      <ul className="  text-[15px]   flex flex-row justify-around items-center mx-10 ml-72 gap-2  rounded-lg mt-8  text-black font-medium">
      <li className="w-[2%] px-20">S.No</li>
        <li className="w-[56%] px-20 rounded-lg my-3 py-3 shadow">
            <p>Aakash Kumar( CS7384744)  reported Priya Kumari( CS746822).</p>
            <span className='text-primary'>Resons For Report </span>
            <span className='font-light'>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
            </span>
        </li>
       
      

      </ul>
  </>
  )
}

export default ReportList