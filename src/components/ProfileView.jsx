import React from "react";
import { about } from "../assets";
import { FaEye } from "react-icons/fa";
import Header from "./Header";
import image from "../DummyData/image";
import ProfileComp from './ProfileComp';
import { BackArrow } from "./DataNotFound";

const ProfileView = () => {
  return (
    <>
      <Header />
      <BackArrow
  LinkData = "/profile"
  className="absolute ml-24 mt-5"
/>
      <div className="shadow rounded-xl mx-52  py-8 mt-9 my-2 relative ">
        <span className="flex  items-center">
          <img
            src={about}
            alt=""
            className="rounded-full border-2 border-primary w-36 mx-16"
          />
          <span>
            <p className="font-semibold text-[23px] mt-3 font-montserrat">
              Sonali Singh
            </p>
            <p className="font-semibold text-[16px]">( CS12345 )</p>
            <span className="flex flex-row  items-baseline gap-36 font-DMsans">
              <span className=" mt-4  text-[14px]">
                <p className="py-1"> 40yrs, 5’7”</p>
                <p className="py-1">03/10/1993</p>
                <p className="py-1">Single</p>
              </span>
              <span className="text-[14px]">
                <p className="py-1">Delhi, India</p>
                <p className="py-1">04:20 AM</p>
                <p className="py-1">Vegetarian</p>
                <p className="py-1">Sindhi</p>
              </span>
            </span>
          </span>
        </span>
      </div>
      {/* About */}
      <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">About Yourself</p>
        </span>
        <hr className="mx-9" />
        <p className="px-9 py-4 font-DMsans font-extralight text-[15px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
          aperiam sit repudiandae. Ducimus, impedit! Perferendis dolor dolorem
          facilis sapiente corporis. Ab consequatur dolor illum in reprehenderit
          earum fuga velit possimus rem, dolores laboriosam ut quidem
          voluptatem!
        </p>
      </div>
{/* //personal appearance */}
      <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Personal Appearance</p>
        </span>
        <hr className="mx-9" />
        <p className="px-9 py-4 font-DMsans font-extralight text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
          aperiam sit repudiandae. Ducimus, impedit! Perferendis dolor dolorem
          facilis sapiente corporis. Ab consequatur dolor illum in reprehenderit
          earum fuga velit possimus rem, dolores laboriosam ut quidem
          voluptatem!
        </p>
      </div>

{/* //images */}
<div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
        <p className="  font-medium  text-[20px]">Images </p>
        </span>
        <hr className="mx-9" />
        <div className="flex flex-wrap gap-3 mt-12 mb-9 mx-10">
        {image.map((img=>
      
        <img src={img.link}  className="border border-1  border-primary rounded-xl " style={{ maxWidth: '200px', maxHeight: '200px' }}/>
   
        ))}
        </div>
        </div>
      {/* //Basic Details */}
     <ProfileComp/>
     <ProfileComp/>
     <ProfileComp/>
     <ProfileComp/>
  

      {/* //Profile Details */}
      {/* <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">
            Additional Personal Details
          </p>
          <span className="text-[20px] cursor-pointer flex items-center font-DMsans"></span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-60 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Height</p>
            <p className=" pt-4 font-medium"> Weight</p>
            <p className=" pt-4 font-medium"> Presently Settled in Country</p>
            <p className=" pt-4 font-medium">Presently Settled in State</p>
            <p className=" pt-4 font-medium">Presently Settled in City</p>
            <p className=" pt-4 font-medium">Open to Relocate in Future</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Diet</p>
            <p className=" pt-4 font-medium">Alcohol Consumption</p>
            <p className=" pt-4 font-medium"> Smoking Preference</p>
            <p className=" pt-4 font-medium">Martial Status</p>
            <p className=" pt-4 font-medium">Contact Details</p>
            <p className=" pt-4 font-medium">Email Address</p>
          </span>
        </span>
      </div> */}

      {/* //carrier details */}
      {/* <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Career Details</p>
          <span className="text-[20px] cursor-pointer flex items-center font-DMsans"></span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-80 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Education</p>
            <p className=" pt-4 font-medium"> University</p>
            <p className=" pt-4 font-medium"> Passing Year</p>
            <p className=" pt-4 font-medium">Profession</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Current Designation</p>
            <p className=" pt-4 font-medium">Previous Occupation</p>
            <p className=" pt-4 font-medium"> Approximate Annual Income</p>
          </span>
        </span>
      </div> */}
      {/* 
        //faimly details */}
      {/* <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Family Details</p>
          <span className="text-[20px] cursor-pointer flex items-center font-DMsans"></span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-60 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Father’s Name</p>
            <p className=" pt-4 font-medium"> Father’s Occupation</p>
            <p className=" pt-4 font-medium"> Mother’s Name</p>
            <p className=" pt-4 font-medium">Mother’s Occupation</p>
            <p className=" pt-4 font-medium">Siblings</p>
            <p className=" pt-4 font-medium">Lives with her Family</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Family Settled (Country)</p>
            <p className=" pt-4 font-medium">Family Settled (State)</p>
            <p className=" pt-4 font-medium"> Family Settled (City)</p>
            <p className=" pt-4 font-medium">Religion</p>
            <p className=" pt-4 font-medium">Caste</p>
            <p className=" pt-4 font-medium">Family Annual Income Range</p>
          </span>
        </span>
      </div> */}

      {/* //Additional deatails  */}
      {/* <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5 ">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">
            Additional Personal Details
          </p>
          <span className="text-[20px] cursor-pointer flex items-center font-DMsans"></span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-60 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Interests</p>
            <p className=" pt-4 font-medium">Fun</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium">Fitness</p>
            <p className=" pt-4 font-medium">Other Interests</p>
          </span>
        </span>
      </div> */}
    </>
  );
};

export default ProfileView;
