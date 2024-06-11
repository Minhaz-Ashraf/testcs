import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (

        <div className='bg-primary  px-9 py-9 text-start w-60 h-screen rounded-r-3xl hidden md:block sm:block '>
            <p className='text-white font-montserrat font-medium text-[30px] px-2 py-6'>Menu</p>
            <span>
           <Link to = "/admin">     <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ">Dashboard</p></Link>
           <Link to = "/admin/user">    <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3 mt-6 rounded-xl text-[17px] ">All Users</p></Link>
           <Link to = "/currency-value">     <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px] ">Currency Value</p></Link>
           <Link to = "/admin/approval-lists">    <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">Approval Page</p></Link>
           <Link to = "/admin/notifications">     <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">Notifications</p></Link>
           <Link to = "/admin/report-lists">     <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">Manage Reports</p></Link>
           <Link to = "">       <p className = " cursor-pointer text-white hover:bg-white hover:text-primary  py-2 px-3  mt-6 rounded-xl text-[17px]">Logout</p></Link>
            </span>
        </div>
  )
}

export default Nav