import React from "react";
import PropTypes from "prop-types";
import { check, curve, logo } from "../../assets/index";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import image from "../../DummyData/image";

const VerifyLinkReq = () => {
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

      <div className="fixed inset-0 bg-[#bbbbbb]  opacity-20 md:block sm:hidden hidden"></div>
      <div className="absolute pt-9 md:block sm:hidden hidden">
        <Marquee
          autoFill
          speed={100}
          loop={0}
          gradientWidth={500}
          className="w-full  bg-red-0 inset-0  opacity-70   mb-[4rem]   px-16 py-9"
        >
          <div className="flex justify-around z-30 items-center  gap-[2rem]">
            {image.map((data) => (
              <img
                src={data.link}
                alt="img"
                className="w-[20rem]  h-[20rem] object-cover     rounded-xl ml-9  zoom cursor-pointer"
              />
            ))}
          </div>
        </Marquee>
      </div>
      <div className="bg-[#FCFCFC] md:absolute z-30  md:mx-96 mx-6 mt-9 md:mt-0 sm:mt-36 my-2 rounded-xl   flex flex-col justify-center items-center font-DMsans">
        <img src={curve} alt="img" className="sm:w-full xl:w-full" />
        <img
          src={check}
          alt="img"
          className="w-[14%] xl:w-28 sm:w-[14%] md:w-[14%] mt-12"
        />
        <p className="text-center md:px-36 mx-3 pt-5 sm:px-20">
          Please verify the link that we have sent to your WhatsApp number.
        </p>
        <Link
          to="/"
          className="bg-primary text-white font-medium px-6 py-2 rounded-lg mt-10 mb-9"
        >
          Back to Homepage
        </Link>
      </div>
    </>
  );
};

export default VerifyLinkReq;
