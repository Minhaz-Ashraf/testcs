import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { BackArrow } from "../components/DataNotFound";
import Header from "../components/Header";

import { logow } from "../assets";

const Notifications = () => {


  return (
    <>
   <Header />
    
   <BackArrow
        LinkData="/user-dashboard"
        className="absolute md:ml-24 md:mt-28 sm:mt-28 w-full md:w-52 overflow-hidden "
      />
    <div className='shadow md:px-9 py-3 pb-20 px-6 mb-36 md:mb-16 md:mx-60 my-5 rounded-lg  sm:mt-36 sm:mb-9 md:mt-44 mt-32 mx-6'>
    <h2 className= "text-primary font-semibold font-montserrat py-7 text-[22px]">Notifications</h2>
      <div className="flex flex-col">
       
          <Link
           
          >
          <span className="flex items-center gap-2  py-3 pt-6 ">
          <img src={logow} alt="" className="w-9 h-9  rounded-full border border-primary"/>
          <p className="text-black font-DMsans text-[15px] ">Dummy text for notifications get</p>
          </span>
          <hr className="border border-[#e9e9e9]" />
          </Link>
     
      </div>
    </div>
    </>
  );
};

export default Notifications;
