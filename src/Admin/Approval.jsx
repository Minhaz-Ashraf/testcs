import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import apiurl from "../util";

import { getToken } from "../Stores/service/getToken";

import Pagination from "./comps/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DataNotFound from "../components/DataNotFound";
import DeclinePopUp from "./comps/DeclinePopUp";
import Loading from "../components/Loading";

const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const ApprovalCard = ({item, index, handleUpdateCategory,  handleReviewSuccess,  handleApprovalOrDecline, currentPage, perPage}) => {
  let categoriesOption = ["A", "B", "C"];
  const [selectedCategories, setSelectedCategories] = useState({});
  const [isDeclineOpen, setIsDeclineOpen] = useState(false); // Corrected state name

  const openDeclinePopup = () => {
    setIsDeclineOpen(true); // Corrected function name
  };

  const closeDecline = () => {
    setIsDeclineOpen(false);
  };
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

 
  // console.log(item, "maklo")
  useEffect(() => {
    const category = { [item._id]: item.category ? item.category.split(",") : [] };
    setSelectedCategories(category);
  }, []);
  // console.log(item, "hshs")
  return (
    <>
      <ul
        key={item._id}
        className="  text-[15px] flex flex-row justify-around items-start mx-10 ml-72 gap-2  rounded-lg mt-8 text-black font-normal"
      >
        <li className="w-[2%]">{(currentPage - 1) * perPage + index + 1}</li>
        <li className="w-[36%] px-3  text-start mb-3 py-3 rounded-lg  bg-[#EAEAEA] shadow  ">
          {item?.deletedStatus || ""}
          Approve the profile of (
          {item.basicDetails[0]?.name.replace("undefined", "")}) made by{" "}
          {item.createdBy[0].createdFor === "myself"
            ? item.gender === "M"
              ? "Himeself"
              : "Herself"
            : item.createdBy[0].createdFor}
          <span className="mx-1">ID : {item?.userId}</span>
          <Link
            className="text-primary cursor-pointer mx-2 "
            to="/profile"
            state={{
              userId: item?._id,
              location: location.pathname,
            }}
          >
            See more...{" "}
          </Link>
        </li>
        <li className="w-[12%] text-center ">
          {categoriesOption.map((option, idx) => (
            <span key={idx} className="">
              <input
                type="checkbox"
                className="bg-[#F0F0F0] rounded-md mt-2 mx-2"
                onChange={(e) => handleCategoryChange(e, item._id)}
                onClick={(e) => handleUpdateCategory(e, item._id)}
                id={`categories${index}-${idx}`}
                name="categories"
                value={option}
                checked={selectedCategories[item._id]?.includes(option)}
              />
              <label htmlFor={`categories${index}-${idx}`}>{option}</label>
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
          ) : item.approvalStatus === "review" ? (
            <span className="py-1 px-5 w-20 bg-indigo-500 text-white rounded-lg cursor-default">
              In-Review
            </span>
          ) : (
            <>
              <span
                onClick={() => handleApprovalOrDecline(item._id, "approved")}
                className="py-1 px-5 bg-primary text-white rounded-lg cursor-pointer"
              >
                Accept
              </span>
              
              {/* <span
 onClick={() => openDeclinePopup(item)}                // onClick={() => handleApprovalOrDecline(item._id, "declined")}
                className="py-1 px-5 border border-primary text-primary rounded-lg cursor-pointer"
              >
                Review
              </span> */}


              <span
                onClick={() => handleApprovalOrDecline(item._id, "declined")}
                className="py-1 px-5  text-primary border border-primary rounded-md font-medium cursor-pointer"
              >
                Decline
              </span>
            </>
          )}
        </li>
      </ul>
      <DeclinePopUp isDeclineOpen={isDeclineOpen}   handleReviewSuccess={handleReviewSuccess} closeDecline={closeDecline} item = {item}  />
    </>
  );
};

const Approval = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [totalPagesCount, setTotalPagesCount] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async (page = 1) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        params: {
          page,
          limit: perPage,
        },
      };
      const response = await apiurl.get("get-user-data-admin", config);
      setAllUsers(response.data.result.data);
      setTotalUsersCount(response.data.totalUsersCount);
      setTotalPagesCount(response.data.lastPage);
      setCurrentPage(page); // Update current page state
      // Optionally, you can set other pagination metadata in state if needed
      console.log("check", response);
    } catch (err) {
      console.log(err);
    }   finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePageChange = (pageNumber) => {
    getAllUsers(pageNumber);
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

  

  const handleReviewSuccess = (userId, reviewText) => {
    // Update user's approval status locally
    setAllUsers((users) =>
      users.map((user) =>
        user._id === userId ? { ...user, approvalStatus: "review", reviewText: reviewText } : user
      )
    );
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
      toast.success("Category updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getToken]);



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
      {loading ? (
          <div className="mt-28 ml-52">
            <Loading />
          </div>
        ) : allUsers.length === 0 ? (
          <DataNotFound
            className="flex flex-col items-center md:ml-36 mt-11 sm:ml-28 sm:mt-20"
            message="No approval requests available"
            linkText="Back to Dashboard"
            linkDestination="/user-dashboard"
          />
        ) : (
          allUsers.map((item, index) => (
            <ApprovalCard
              item={item}
              key={item._id}
              handleReviewSuccess={handleReviewSuccess}
              index={index}
              handleApprovalOrDecline={handleApprovalOrDecline}
              handleUpdateCategory={handleUpdateCategory}
              currentPage={currentPage}
              perPage={perPage}
            />
          ))
        )}
      </div>
      {allUsers.length > 0 && (
        <div className="flex justify-center items-center mt-3 mb-5 ml-52">
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage * perPage < totalUsersCount}
            hasPreviousPage={currentPage > 1}
            onPageChange={handlePageChange}
            totalPagesCount={totalPagesCount}
          />
        </div>
      )}
    </>
  );
};

export default Approval;
