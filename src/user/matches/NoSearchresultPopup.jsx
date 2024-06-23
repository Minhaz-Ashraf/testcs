import React from "react";


const NoSearchresultPopup = ({
    message, onClose
}) => {
  
  return (
    <>
      {/* {isDeclineOpen && ( */}
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 `}
        //   ${
        //     isDeclineOpen ? "block" : "hidden"
        //   }`}
        
        >
          <div className="bg-white pb-9  rounded-lg md:w-[58%] w-full  relative p-9  ">
            <span className="flex flex-col items-center justify-center">
              <p className="text-center font-DMsans text-black font-medium text-[20px] ">
                Oops! {message}
              </p>

              
            </span>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
            
              <span
                onClick={() => {
                  onClose();
                
                //   declineUserFunc();
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Okay
              </span>
            </div>
          </div>
        </div>
      {/* )} */}
      
    </>
  );
};

export default NoSearchresultPopup;
