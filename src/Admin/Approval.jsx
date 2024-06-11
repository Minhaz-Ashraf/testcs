import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import apiurl from "../util";

import { getToken } from "../Stores/service/getToken";

import Pagination from "./comps/Pagination";
const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};
const Approval = () => {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [allUsers, setAllUsers] = useState([]);

  const handleCategoryChange = (e, userId) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevState) => {
      const userCategories = prevState[userId] || [];
      if (checked) {
        // Add category to the user's selected categories
        return { ...prevState, [userId]: [...userCategories, value] };
      } else {
        // Remove category from the user's selected categories
        return {
          ...prevState,
          [userId]: userCategories.filter((category) => category !== value),
        };
      }
    });
  };

  const getAllUsers = async () => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      const response = await apiurl.get("get-user-data-admin", config);
      setAllUsers(response.data.result.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.lastPage);
      console.log("check", response);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllUsersStatistics = async () => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      const response = await apiurl.get("get-user-statistics", config);
      console.log("check", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprovalOrDecline = async (userId, type) => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      await apiurl.put(
        `/approve-or-decline/${userId}`,
        { registrationPhase: type },
        config
      );
      // Update user's approval status locally
      setAllUsers((users) =>
        users.map((user) =>
          user._id === userId ? { ...user, approvalStatus: type } : user
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCategory = async (e, userId) => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      await apiurl.put(
        `/update-user-category/${userId}`,
        { categoryType: e.target.value },
        config
      );
      // // Update user's approval status locally
      // setAllUsers((users) =>
      //   users.map((user) =>
      //     user._id === userId ? { ...user, approvalStatus: type } : user
      //   )
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAllUsers(pageNumber);
  };

  useEffect(() => {
    getAllUsers();
  }, [getToken]);
  const categoriesOption = ["A", "B", "C"];
  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <p className="font-semibold text-[28px] ml-72 pt-20">
        Pending Approval List
      </p>
      <ul className=" bg-[#F0F0F0] text-[15px] py-7  flex flex-row justify-around items-center mx-10 ml-72 gap-2  rounded-lg mt-8 h-[6vh] text-black font-medium">
        <li className="w-[2%]">S.No</li>
        <li className="w-[36%] text-center">Description</li>
        <li className="w-[9%] text-center">Category</li>
        <li className="w-[9%] text-center">Action</li>
      </ul>

      <div>
        {Array.isArray && allUsers.length > 0 ? (
          allUsers.map((item, index) => (
            <ul
              key={item._id}
              className="  text-[15px] flex flex-row justify-around items-start mx-10 ml-72 gap-2  rounded-lg mt-8 text-black font-normal"
            >
              <li className="w-[2%]">{index + 1}</li>
              <li className="w-[36%] px-3  text-start mb-3 py-3 rounded-lg  bg-[#EAEAEA] shadow  ">
                Approve the profile of (
                {item.basicDetails[0]?.name.replace("undefined", "")}) made by{" "}
                {item.createdBy[0].createdFor === "myself"
                  ? item.gender === "M"
                    ? "Himeself"
                    : "Herself"
                  : item.createdBy[0].createdFor}
                .
                <p className="text-primary cursor-pointer hidden">
                  {" "}
                  See more...{" "}
                </p>
              </li>
              <li className="w-[9%] text-center">
                {categoriesOption.map((option, idx) => (
                  <span key={idx} className="">
                    <input
                      type="checkbox"
                      className="bg-[#F0F0F0] rounded-md mt-2 mx-1"
                      onChange={(e) => handleCategoryChange(e, item._id)}
                      onClick={(e) => handleUpdateCategory(e, item._id)}
                      id={`categories${index}-${idx}`}
                      name="categories"
                      value={option}
                      checked={
                        selectedCategories[item._id]?.includes(option) || false
                      }
                    />
                    <label htmlFor={`categories${index}-${idx}`}>
                      {option}
                    </label>
                  </span>
                ))}
              </li>
              <li className="w-[9%] text-center flex flex-col gap-2">
                {item.approvalStatus === "approved" ? (
                  <span className="py-1 px-5 bg-green-500 text-white rounded-lg cursor-default">
                    Accepted
                  </span>
                ) : item.approvalStatus === "declined" ? (
                  <span className="py-1 px-5 bg-red-500 text-white rounded-lg cursor-default">
                    Rejected
                  </span>
                ) : (
                  <>
                    <span
                      onClick={() =>
                        handleApprovalOrDecline(item._id, "approved")
                      }
                      className="py-1 px-5 bg-primary text-white rounded-lg cursor-pointer"
                    >
                      Accept
                    </span>
                    <span
                      onClick={() =>
                        handleApprovalOrDecline(item._id, "declined")
                      }
                      className="py-1 px-5 border border-primary text-primary rounded-lg cursor-pointer"
                    >
                      Decline
                    </span>
                  </>
                )}
              </li>
            </ul>
          ))
        ) : (
          <p className="ml-72 mt-8">No users to display.</p>
        )}
      </div>
      <div className="flex justify-center items-center mt-3 mb-5  ">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Approval;
