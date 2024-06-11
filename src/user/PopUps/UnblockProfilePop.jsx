import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import apiurl from "../../util";
import { FaBullseye } from "react-icons/fa";

const UnblockProfilePop = ({
  isUnblockOpen,
  closeUnblock,
  unblockUser,
  id
}) => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    toast.success("Profile unblocked successfully");
    // navigate("/");
    unblockUser(id);
  };
  return (
    <>
      {isUnblockOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isUnblockOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[38%] w-full  relative p-9  ">
            <p className="text-center font-DMsans text-black font-semibold text-[16px]">
              Do you want to unblock profile ?
            </p>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closeUnblock}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                No
              </span>
              <span
                onClick={() => {
               unblockUser(id);
                 closeUnblock();
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Yes
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnblockProfilePop;