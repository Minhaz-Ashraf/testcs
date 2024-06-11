import React, { useState } from 'react'
import Header from '../../components/Header'
import SideBar from '../Dashboard/SideBar'
import { BackArrow } from '../../components/DataNotFound';

const WhatSappSetting = () => {
  const [whatsappSetting, setWhatsappSetting] = useState({
    WhatsappSet: "",
   });
 
   const handleinput = (e) => {
     const { value, name } = e.target;
     setWhatsappSetting((log) => ({
       ...log,
       [name]: value,
     }));
   };
 
   const whatsAppOption = ["Enable", "Disable"];
  return (
    <>

    <Header/>
    <div className=''>
    <SideBar/>
    </div>
    <BackArrow className="sm:hidden md:hidden block"/>
      <div className='shadow md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6'>
        <span> 
          <p className="font-semibold font-montserrat mt-5  text-[22px]">Email Settings</p>
          <p className="pt-3"> Subscribe Email Services Every 15 Days</p>
          <span className="flex flex-col mt-2">
          {whatsAppOption.map((option, index) => (
            <span key={index}>
            <input
              type="radio"
              className="bg-[#F0F0F0] rounded-md  mt-2 mx-1 "
              onChange={(e) => handleinput(e)}
              id={`WhatsappSet${index}`}
              name="WhatsappSet"
              value={option}
            />
            <label htmlFor={`WhatsappSet${index}`} >
             {option}
            </label>
            </span>
        ))}
          </span>
         
        </span>
      </div>
    
</>
  )
}

export default WhatSappSetting