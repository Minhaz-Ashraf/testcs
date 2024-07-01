import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import PhoneInput from 'react-phone-input-2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiurl from '../../util';
import Marquee from 'react-fast-marquee';
import image from '../../DummyData/image';
import { logo } from '../../assets';

const NumberChangePop = () => {  // Make sure userId is passed as a prop
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
   const {userId, email}  = useParams();
  const handleChange = (value, country) => {
    setCountryCode(country.dialCode);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleChangeNumber = async () => {  
    try {
      const response = await apiurl.put('/change-registered-number', {
        number: `${countryCode}${phoneNumber.slice(countryCode?.length)}`,
        userId : userId
      });
      localStorage.removeItem('authToken');
      toast.success("Number changed successfully");
      navigate("/updated-registered-number");
    
    } catch (error) {
      console.error('Error changing registered number:', error);
      
      if (error.response && error.response.status === 403) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error('Error changing registered number');
      }
    }
  };

  return (
    <>
     <span>
        <Link to="/">
          {" "}
          <img
            src={logo}
            alt="logo"
            className="md:w-[8%] sm:w-[14%] w-20 md:mx-12 mx-6 mt-3 cursor-pointer"
          />
        </Link>
      </span>
     <div className="fixed inset-0 bg-[#bbbbbb] md:block sm:hidden hidden mt-36 opacity-20 "></div>
<div className="absolute pt-9 md:block sm:hidden hidden">

      <Marquee
        autoFill
    
        speed={100}
        loop={0}
        gradientWidth={500}
        className="w-full  bg-red-0 inset-0  opacity-70   mb-[4rem]   px-16 py-9"
      >
       
        <div className="flex justify-around  items-center  gap-[2rem]">
       {image.map((data=> <img src={data.link} alt="img"  className="w-[20rem]  h-[20rem] object-cover     rounded-xl ml-9  zoom cursor-pointer" />
      ))}
        </div>
      </Marquee>
      </div>
      
      <div className="bg-[#FCFCFC]  md:absolute  md:w-[35%] md:px-9 sm:px-9 relative px-5 py-6 md:mx-[33%] sm:mx-52  mx-6 mt-9 md:mt-20 my-2 rounded-xl shadow  items-center font-DMsans">
          <p className='text-center font-DMsans text-black font-semibold text-[20px]'>Change Number</p>
          <p className='font-semibold text-start mt-3 text-[14px]'>New Number</p>
          <span className='relative'>
          <label>
         
            <PhoneInput
              className="mt-3 mb-9  "
                      containerStyle={{ width: "138%" }}
                      buttonStyle={{ width: "0%", backgroundColor: "transparent" }}
                      inputStyle={{ width: "70%", height: "3rem" }}
              country={"in"}
              value={phoneNumber}
              onChange={handleChange}
              inputProps={{
                required: true,
              }}
            />
              <span className='text-red-600 text-[12px] font-medium mt-2 absolute top-12 '>Add Your New Whatsapp Number</span>
             
          </label>
          {!valid && (
            <p className="text-start text-[12px] absolute bottom-4 mx-20 md:mx-28  text-red-600">
              Please enter a valid phone number*
            </p>
          )}
          </span>
        
          <div onClick={handleChangeNumber} className='px-8 py-2 cursor-pointer rounded-lg text-white border text-center bg-primary mt-5 mb-6'>Submit</div>
      </div>
      
    </>
  );
}

export default NumberChangePop;
