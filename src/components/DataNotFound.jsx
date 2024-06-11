import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dnf } from '../assets';
import { IoArrowBackOutline } from 'react-icons/io5';

const DataNotFound = ({ message, linkText, linkDestination, className }) =>
{
  return (
    <span className={className}>
      <img src={dnf} alt="img" className='w-64' />
      <p className='font-DMsans mt-6'>{message}</p>
      <Link to={linkDestination} className='mt-3 bg-primary rounded-lg text-white py-2 px-3'>
        {linkText}
      </Link>
    </span>
  );
};

function BackArrow({ className , LinkData})
{
  const navigate = useNavigate();

  const goBack = () => {
    
      navigate(-1); 
    
   
  };
  return (
    <span className={className}>
      <span onClick={goBack}>
      <span className='flex items-center bg-primary md:bg-transparent sm:bg-transparent  text-white py-6 px-6'>
        <IoArrowBackOutline className="md:text-primary sm:text-primary text-[28px] cursor-pointer" />
        <span> Back</span>
        </span>
      </span>
    </span>
  )
}

export { DataNotFound, BackArrow };
export default DataNotFound;