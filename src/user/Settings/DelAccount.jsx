import React, { useState } from "react";
import Header from "../../components/Header";
import SideBar from "../Dashboard/SideBar";
import { BackArrow } from "../../components/DataNotFound";
import DeleteProfilePop from "../PopUps/DeleteProfilePop";
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";

const DelAccount = () => {
  const [deleteAccount, setDeleteAccount] = useState({
    deleteProfile: "",
    marriageFixedOption: false,
    marriageFixedDecision: "",
  });

  const { userId } = useSelector(userDataStore);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Corrected state name

  const openDeletePopup = () => {
    setIsDeleteOpen(true); // Corrected function name
  };
  const deleteData = async () => {
    if (userId) {
      try {
        let deleteReason = deleteAccount.deleteProfile;
      if (deleteAccount.marriageFixedOption === true) {
        deleteReason += `, fixed by connecting soulmate : ${deleteAccount.marriageFixedDecision}`;
      }
        apiurl.put(`/delete-user`, {
          userId,
          deleteReason
        });
      } catch (err) {}
    }
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    if (name === "deleteProfile" && value === "Marriage Fixed") {
      setDeleteAccount((prevState) => ({
        ...prevState,
        [name]: value,
        marriageFixedOption: true,
      }));
    } else {
      setDeleteAccount((prevState) => ({
        ...prevState,
        [name]: value,
        marriageFixedOption: false,
        marriageFixedDecision: "", // Reset decision if option changed
      }));
    }
  };

  const handleDecision = (e) => {
    const { value } = e.target;
    setDeleteAccount((prevState) => ({
      ...prevState,
      marriageFixedDecision: value,
    }));
  };


  const deleteOptions = ["Marriage Fixed", "Married", "Other Reason"];

  return (
    <>
      <Header />
      <div className="mt-">
        <SideBar />
      </div>
      <BackArrow className="sm:hidden md:hidden block" />
      <div className="shadow md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6">
        <DeleteProfilePop
        deleteData={deleteData}
          isDeleteOpen={isDeleteOpen}
          closeDelete={closeDelete}
        />{" "}
        {/* Corrected prop name */}
        <span>
          <p className="font-semibold mb-3 text-[22px]">Delete Profile</p>
          <p>Please choose a reason for profile deletion.</p>
          <p>Note: If you delete your profile, it cannot be restored.</p>
          <span className="flex flex-col">
            {deleteOptions.map((option, index) => (
              <span key={index}>
                <input
                  type="radio"
                  className="bg-[#F0F0F0] rounded-md mt-2 mx-1"
                  onChange={(e) => handleInput(e)}
                  id={`deleteProfile${index}`}
                  name="deleteProfile"
                  value={option}
                />
                <label htmlFor={`deleteProfile${index}`}>{option}</label>
                {deleteAccount.marriageFixedOption &&
                  option === "Marriage Fixed" && (
                    <div className="">
                      <p className="mr-2 mb-2">
                        Is your marriage fixed by Connnecting Soulmate ?
                      </p>
                      <span className="flex mx-1 ">
                        <div className="mr-4">
                          <input
                            type="radio"
                            id="yesOption"
                            name="marriageFixedDecision"
                            value="Yes"
                            onChange={(e) => handleDecision(e)}
                            className="me-2"
                          />
                          <label htmlFor="yesOption">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="noOption"
                            name="marriageFixedDecision"
                            value="No"
                            onChange={(e) => handleDecision(e)}
                            className="me-2"
                          />
                          <label htmlFor="noOption">No</label>
                        </div>
                      </span>
                    </div>
                  )}
              </span>
            ))}
          </span>
          <div className="mt-6 m-2">
            <span
              className="bg-primary px-6 py-2 rounded-lg text-white  cursor-pointer "
              onClick={openDeletePopup}
            >
              {" "}
              Delete
            </span>{" "}
            {/* Corrected function name */}
          </div>
        </span>
      </div>
    </>
  );
};

export default DelAccount;
