import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../../Stores/slices/PopupSlice";


const BlockPop = ({  blockUser, setIsOpenPop, closeblockPop }) => {
  

  return (
    <>
      <div className=" flex justify-center   items-center  z-30  popup-backdrop">
        <div className=" bg-white  py-9 px-20 rounded-md relative">
        
          <span className=" font-DMsans font-medium text-[16px]">
            Are you sure want to block this profile?
          </span>
          <span className="flex items-center gap-6 justify-center mt-5">
            <span
              onClick={closeblockPop}
              className="border border-primary cursor-pointer text-primary px-9 py-2 rounded-md"
            >
              No
            </span>
            <span
              onClick={() => {
                blockUser();
               closeblockPop();
              }}
              className="bg-primary text-white px-9 cursor-pointer py-2 rounded-md"
            >
              Yes
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default BlockPop;
