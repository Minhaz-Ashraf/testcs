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
 <BackArrow
 className = " absolute md:ml-24 md:mt-32 sm:mt-28 md:w-52 w-full"/>
      <BasicPartnerEdit />
    </>
  );
};

export default PartnerEdit;
