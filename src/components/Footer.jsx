import React from 'react'
import { appstore, googleplay, logow } from '../assets'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  const handlePrivacy= () => {
    navigate("/privacy"); 
    window.scrollTo(0, 0);
  };

  const handleTerm = () => {
    navigate("/terms"); 
    window.scrollTo(0, 0);
  };
  return (
    
    <footer>
          <div className=" bg-black text-white mt-20 md:px-16 sm:px-8 ">
            <span className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
              <span className="grid grid-cols-1  lg:grid-cols-3  ">
                <span></span>
                <span className="grid grid-cols-1 gap-9 md:gap-0 sm:gap-0 px-6 md:px-0 sm:grid-cols-4 md:grid-cols-4 lg:col-span-4 lg:grid-cols-4 py-5 items-center">
                <Link to='/'>  <img src={logow} alt="logo" className="md:w-32 sm:w-32 w-24  " /></Link>
                  <span className="mt-5">
                    <p className="font-medium font text-[18px] cursor-pointer">Quick Links</p>
                    <ul className="md:mt-5 mt-3 space-y-4 text-sm  font-thin">
                  <li onClick={handlePrivacy}>Privacy Policy</li>
                   <li onClick={handleTerm} className='mt-3 cursor-pointer'>Terms & Conditions</li>
                    </ul>
                  </span>
                  <span className="md:m-5 sm:m-5 mt-4">
                    <p className="font-medium font md:text-[18px] sm:text-[16px]">
                      Help & Support
                    </p>
                    <ul className="mt-5 space-y-3 text-sm font-thin ">
                      {/* <li className=' cursor-pointer'>FAQs</li> */}
                      <li className='cursor-pointer'><a href="mailto:work.connectingsoulmate@gmail.com">Contact Us</a></li>
                    </ul>
                  </span>
                  <span className="">
                  <p className="font-bold md:text-[25px] sm:text-[20px] text-white font-montserrat"> Launching Soon</p>
                    {/* <p className="font-medium font pt-7 md:pt-0 text-[18px]">
                      App Available On
                    </p> */}
                    <span className="flex justify-start items-center">
                    {/* <p className="font-bold text-[25px] text-white font-montserrat"> Launching Soon</p> */}
                      {/* <img
                        src={googleplay}
                        alt="img"
                        className="py-9 w-[35%]  "
                      />
                      <img src={appstore} alt="img" className="ml-5 w-[35%] " /> */}
                    </span>
                  </span>
                </span>
              </span>
            </span>

            <span className="flex justify-center items-center ">
              <hr className="divider w-[93%] pb-8" />
            </span>

            <p className="text-xs pb-5 -500 text-center ">
              © 2024. Connecting Soulmates. All rights reserved.
            </p>
          </div>
        </footer>
  )
}

export default Footer