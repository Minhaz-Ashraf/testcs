import React from "react";
import Header from "../../components/Header";
import BasicPartnerEdit from "./BasicPartner";
import { BackArrow } from "../../components/DataNotFound";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const PartnerEdit = () => {
  return (
    <>
      <Header />
      <span className="absolute md:ml-24 md:mt-32 sm:mt-28 md:w-52 w-full">

<span className='flex items-center bg-primary md:bg-transparent sm:bg-transparent  text-white py-6 px-6'>
<Link to = "/user-dashboard">
  <IoArrowBackOutline className="md:text-primary sm:text-primary text-[28px] cursor-pointer" />
  <span> Back</span>
  </Link>
  </span>
</span>
      <BasicPartnerEdit />
    </>
  );
};

export default PartnerEdit;
