import React, { useEffect, useState } from "react";
import { IoPencilOutline, IoSearchOutline } from "react-icons/io5";
import Nav from "../Nav";
import { FaBan } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getToken } from "../../Stores/service/getToken";
import apiurl from "../../util";
const config = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json; charset=UTF-8",
  },
};

const UserOperation = ({selectedOptions, isCategoryData, selectedCategories, handleCategoryChange,  handleUpdateCategory, userData, config, deleteUsers}) => {

    const downloadPDF = async () => {
        try { // Replace 'user_id_here' with the actual user ID
          const response = await apiurl.get(`/download-single-user-data/pdf/${userData?._id}`);
      
          // Create a blob URL to download the PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `user_${userData?._id}.pdf`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };
      const categoriesOption = ["A", "B", "C"];
  return (
    <ul className="  text-[15px] py-7  flex flex-row justify-evenly items-center mx-16 ml-72 gap-2 p-2 rounded-lg mt-8 h-[6vh] text-black font-normal">
        <li className="w-[2%]">1</li>
        <li className="w-[8%] text-center">{userData.userId}</li>
        <li className="w-[12%] text-center">{userData.basicDetails[0]?.name}</li>
        <li className="w-[14%] text-center flex items-center">
        {categoriesOption?.map((option, idx) => (
                  <span key={idx} className="">
                    <input
                      type="checkbox"
                      className="bg-[#F0F0F0] rounded-md mt-2 mx-1"
                      onChange={(e) => handleCategoryChange(e, userData?._id)}
                      onClick={(e) => handleUpdateCategory(e, userData?._id)}
                      id={`categories`}
                      name="categories"
                      value={isCategoryData}
                      checked={
                        selectedCategories[userData?._id]?.includes(option) || false
                      }
                    />
                    <label htmlFor={`categories`}>
                      {option}
                    </label>
                  </span>
                ))}
            
        </li>
        <span className="w-[9%] text-center px-3 py-1 bg-primary text-white rounded-md cursor-pointer">
          Read
        </span>
        <span onClick={() => downloadPDF()} className="w-[10%] text-center px-3 py-1 bg-primary text-white rounded-md cursor-pointer">
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
          <span onClick={() => deleteUsers(userData._id)}>Delete</span>
          <span className=" text-primary">
            <FaBan />{" "}
          </span>{" "}
          <span>Ban</span>
        </li>
          </ul>
  )
}

export default UserOperation