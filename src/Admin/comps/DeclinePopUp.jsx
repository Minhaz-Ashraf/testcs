import React, { useState } from "react";
import apiurl from "../../util";
import { getToken } from "../../Stores/service/getToken";
import { toast } from "react-toastify";

const DeclinePopUp = ({
  isDeclineOpen,
  closeDecline,
  item,
  handleReviewSuccess,
}) => {
  const [reviewText, setReviewText] = useState();
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  const handleTextareaChange = (event) => {
    setReviewText(event.target.value);
  };
  const handleReviewSend = async (userId, type) => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      await apiurl.put(
        `/review-user-data/${userId}`,
        { reviewReason: reviewText },
        config
      );
      toast.info("Profile in review")
      handleReviewSuccess(userId, reviewText);
      // Update user's approval status locally
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isDeclineOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isDeclineOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[58%] w-full  relative p-9  ">
            <span className="flex flex-col items-center justify-center">
              <p className="text-center font-DMsans text-black font-semibold text-[16px] ">
                Do you want to decline the user approval request ?
              </p>

              <textarea
                name=""
                placeholder="Enter the reason for declining the user..."
                className="shadow mt-5 w-96 px-2  py-2 "
                value={reviewText}
                onChange={handleTextareaChange}
              ></textarea>
            </span>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
              <span
                onClick={closeDecline}
                className="px-8 py-2 cursor-pointer  rounded-lg text-primary border border-primary"
              >
                No
              </span>
              <span
                onClick={() => {
                  closeDecline();
                  handleReviewSend(item._id, "review");
                //   declineUserFunc();
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

export default DeclinePopUp;
