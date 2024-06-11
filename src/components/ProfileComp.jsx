import React from 'react'

const ProfileComp = () => {
  return (
 <>
     <div className="shadow rounded-xl mx-52 py-3 mt-9 my-5">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Basic Details</p>
          <span className="text-[20px] cursor-pointer flex items-center font-DMsans"></span>
        </span>
        <hr className="mx-9" />
        <span className="flex flex-row  items-baseline gap-80 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Profile Created For</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium"> Name</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium"> Gender</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium">Birth</p>
            <p className=" font-light">Myself</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Time of Birth</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium"> Age</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium"> Place of Birth</p>
            <p className=" font-light">Myself</p>

            <p className=" pt-4 font-medium">Manglik Status</p>
            <p className=" font-light">Myself</p>
          </span>
        </span>
      </div>
 </>
  )
}

export default ProfileComp