import React, { useEffect, useState } from "react";
import { IoPencilOutline, IoSearchOutline } from "react-icons/io5";
import Nav from "../Nav";
import { FaBan } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

import { Link } from "react-router-dom";

import "jspdf-autotable";
import DeleteUserPopup from "./DeleteUserPopup";

const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const UserOperation = ({
  key,
  index,
  handleUpdateCategory,
  userData,
  config,
  deleteUsers,
  currentPage,
  perPage,
}) => {
  const [category, setCategory] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); // Corrected state name
  const [selectedCategories, setSelectedCategories] = useState({});

  const openDeletePopup = () => {
    setIsDeleteOpen(true); // Corrected function name
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  // const downloadPDF = async () => {
  //     try { // Replace 'user_id_here' with the actual user ID
  //       const response = await apiurl.get(/download-single-user-data/pdf/${userData?._id});

  //       // Create a blob URL to download the PDF
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', user_${userData?._id}.pdf);
  //       document.body.appendChild(link);
  //       link.click();
  //     } catch (error) {
  //       console.error('Error downloading PDF:', error);
  //     }
  //   };

  // const handleDownloadProfile = (userData) => {
  //   const fileName = profile_${userData.userId}.json;
  //   const json = JSON.stringify(userData, null, 2); // Convert the user data to JSON string
  //   const blob = new Blob([json], { type: "application/json" });
  //   const url = window.URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", fileName);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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


  const categoriesOption = ["A", "B", "C"];
  useEffect(() => {
    const category = { [userData._id]: userData.category ? userData.category.split(",") : [] };
    setSelectedCategories(category);
  }, [userData]);
  return (
    <>
      <ul className="  text-[15px] py-7  flex flex-row justify-evenly items-center mx-16 ml-72 gap-2 p-2 rounded-lg mt-8 h-[6vh] text-black font-normal">
        <li className="w-[2%]">
          {(currentPage - 1) * parseInt(10) + index + 1}
        </li>
        <li className="w-[8%] text-center">{userData?.userId}</li>
        <li className="w-[12%] text-center">
          {userData?.basicDetails[0]?.name}
        </li>
        <li className="w-[14%] text-center flex items-center">
          {categoriesOption?.map((option, idx) => (
            <span key={idx} className="">
              <input
                type="checkbox"
                className="bg-[#F0F0F0] rounded-md mt-2 mx-1"
                onChange={(e) => handleCategoryChange(e, userData?._id)}
                onClick={(e) => handleUpdateCategory(e, userData?._id)}
            
                name="categories"
                value={option}
                checked={selectedCategories[userData._id]?.includes(option)}
              />
              <label >{option}</label>
            </span>
          ))}
        </li>
        <Link
          to="/profile"
          state={{
            userId: userData?._id,
            location: location.pathname,
          }}
          className="w-[9%] text-center px-3 py-1 bg-primary text-white rounded-md cursor-pointer"
        >
          Read
        </Link>
        <span className="w-[10%] text-center px-3 py-1 bg-primary text-white rounded-md cursor-pointer">
          Download
        </span>
        <li className="w-[10%] text-center flex items-center gap-2 ">
          <span>
            <IoPencilOutline />{" "}
          </span>{" "}
          <span>Edit</span>
          <span>
            <RiDeleteBin5Line />{" "}
          </span>{" "}
          <span
            className="cursor-pointer"
            onClick={() => {
              deleteUsers(userData._id);
              openDeletePopup();
            }}
          >
            Delete
          </span>
          <span className=" text-primary">
            <FaBan />{" "}
          </span>{" "}
          <span>Ban</span>
        </li>
      </ul>
      <DeleteUserPopup isDeleteOpen={isDeleteOpen} closeDelete={closeDelete} />
    </>
  );
};

export default UserOperation;