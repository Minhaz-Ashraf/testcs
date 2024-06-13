import React, { useEffect, useState } from "react";
import { IoPencilOutline, IoSearchOutline } from "react-icons/io5";
import Nav from "./Nav";
import { FaBan } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getToken } from "../Stores/service/getToken";

import UserOperation from './comps/userOperations';
import apiurl from "../util";
import Pagination from './comps/Pagination';

const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
 
};

const User = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    A: false,
    B: false,
    C: false,
  });
  const [isCategoryData, setIsCategoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalPagesCount, setTotalPagesCount] = useState({});
  const [page, setPage] = useState(1);
 
  const [selectedCategories, setSelectedCategories] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const perPage = 10; // Number of users per page

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
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



  const getAllUsers = async (page  = 1, options = {}) => {
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
      if (options.search) {
        config.params.search = options.search;
      }
      const response = await apiurl.get(`/get-all-user-data-admin`, config);
      setAllUsers(response.data?.result?.data);
      setCurrentPage(page);
      setTotalPagesCount(response.data.lastPage);
      setTotalUsersCount(response.data.totalUsersCount);
      setIsCategoryData(response.data?.result?.data[0]?.category);

      console.log(response.data?.result?.data[0]?.category);
    } catch (err) {
      console.log(err);
    }
  };


 const deleteUsers = async (userId) => {
    try {
      const token = getToken();
      config["headers"]["Authorization"] = `Bearer ` + token;
      await apiurl.put(
        `/delete-user/${userId}`,
        { type : "delete" },
        config
      );

    } catch (err) {
      console.log(err);
    }
  };
  console.log(allUsers)
  const [searchQuery, setSearchQuery] = useState(undefined);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllUsers(page, { search: searchQuery });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page]);

  console.log(searchQuery);

  const handlePageChange = (pageNumber) => {
    getAllUsers(pageNumber);
  };
  
//   useEffect(() => {
// const fetchUserData = async () =>{
  
//   }, [userData]);
  const categoriesOption = ["A", "B", "C"];
  return (
    <>
        <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div className="md:px-16 pt-10 md:ml-56 ">
        <p className="font-semibold text-[30px]  font-montserrat ">User List</p>
        <span className="flex justify-between mt-9 gap-96">
          <span className="font-DMsans">
            <p className="bg-primary text-white px-12 py-2 rounded-lg cursor-pointer">
              + Add New User
            </p>
            <p className="bg-[#F0F0F0] mt-5 text-center rounded-lg py-2 w-36 font-medium">
             Total Users : {totalUsersCount}
            </p>
          </span>
          <span className="flex flex-col relative">
            <span className="flex">
              <span className="absolute text-[23px] pt-2 px-3">
                {" "}
                <IoSearchOutline />
              </span>
              <input
                type="text"
                className="bg-[#F0F0F0] py-2 px-3 pl-11 rounded-lg w-[42vh] placeholder:px-12"
                placeholder="Search"
                onChange={handleSearch}
              />
            </span>
            <span className="text-white bg-primary mt-5 py-2 rounded-lg text-center w-[28vh] cursor-pointer">
              Download
            </span>
          </span>
        </span>
      </div>

      <ul className=" bg-[#F0F0F0] text-[15px] py-7  flex flex-row justify-evenly items-center mx-10 ml-72 gap-2  rounded-lg mt-8 h-[6vh] text-black font-medium">
        <li className="w-[2%]">S.No</li>
        <li className="w-[8%] text-center">UserId</li>
        <li className="w-[12%] text-center">Name of the user</li>
        <li className="w-[6%] text-center">Category</li>
        <li className="w-[7%] text-center">Read user Profile</li>
        <li className="w-[10%] text-center">Download Profile PDf</li>
        <li className="w-[10%] text-center">Actions</li>
      </ul>
    
      {allUsers?.map((item, index) => (
   
        <UserOperation
          key={index}
          selectedOptions={selectedOptions}
          handleUpdateCategory={handleUpdateCategory}
          categoriesOptions={categoriesOption}
          userData={item}
          deleteUsers={deleteUsers}
          handleCategoryChange = {handleCategoryChange}
          selectedCategories = {selectedCategories}
          isCategoryData = {isCategoryData}
          currentPage={{currentPage}}
          perPage = {perPage}
      
         
        />
      ))}
    
      <div className="flex justify-center items-center mt-3 mb-5 ml-52  ">

      <Pagination
currentPage={currentPage}
        hasNextPage={currentPage * perPage < totalUsersCount}
        hasPreviousPage={currentPage > 1}
        onPageChange={handlePageChange}
        totalPagesCount = {totalPagesCount}
/>
</div>
    </>
  );
};

export default User;
