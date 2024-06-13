import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import OptionDetails from "./optionDetails";
import { optionData } from "../../DummyData/userProfile";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import io from "socket.io-client";
import DataNotFound from "../../components/DataNotFound";
import { Skeleton } from "antd";

const socket = io(`https://admincs.gauravdesign.com`);

const ProfileReq = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { userId } = useSelector(userDataStore);
  const [buttonFlag, setButtonFlag] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonClickFlag, setButtonClickFlag] = useState(false);
  const navigate = useNavigate();
  const { option } = useParams();
  const [dataCards, setDataCards] = useState([]);
  const path = window.location.pathname;
  console.log(dataCards, "llp");
  const [action, setAction] = useState("");

  const getRequests = async (type, option) => {
    try {
      if (!userId) {
        console.error("Error: userId is not present");
        return;
      }
      const response = await apiurl.get(
        `/api/${type}-request/${option}/${userId}`
      );
      setButtonFlag(response.data);
      console.log(
        `${type} requests received successfully:`,
        response.data.requests
      );

      if (path.includes("/recieved")) {
        return response.data.requests.map((item) => ({
          id: item._id,
          actionType: item.action,
          Id: item[`${type}RequestTo`]._id,
          value: item[`${type}RequestBy`],
          differentiationValue: "To",
          isShortListedTo: item?.isShortListedTo,
          isShortListedBy: item?.isShortListedBy,
          isRequestTo: item?.isProfileRequestTo,
          isRequestBy: item?.isProfileRequestBy,
        }));
      } else if (path.includes("/declined") || path.includes("/accepted")) {
        return response.data.requests.map((item) => ({
          id: item._id,
          actionType: item.action,
          differentiationValue:
            item[`${type}RequestBy`]._id === userId ? "By" : "To",
          Id:
            item[`${type}RequestBy`]._id === userId
              ? item[`${type}RequestBy`]._id
              : item[`${type}RequestTo`]._id,
          value:
            item[`${type}RequestBy`]._id === userId
              ? item[`${type}RequestTo`]
              : item[`${type}RequestBy`],
          isShortListedTo: item?.isShortListedTo,
          isShortListedBy: item?.isShortListedBy,
          isRequestTo: item?.isProfileRequestTo,
          isRequestBy: item?.isProfileRequestBy,
        }));
      } else {
        return response.data.requests.map((item) => ({
          id: item._id,
          actionType: item.action,
          Id: item[`${type}RequestBy`]._id,
          value: item[`${type}RequestTo`],
          isShortListedTo: item?.isShortListedTo,
          isShortListedBy: item?.isShortListedBy,
          isRequestTo: item?.isInterestRequestTo,
          isRequestBy: item?.isInterestRequestBy,
          differentiationValue: "By",
        }));
      }
    } catch (error) {
      console.error(`Error getting ${type} requests:`, error);
      return [];
    }
  };  console.log(dataCards, "klk")

  useEffect(() => {
    if (option && optionData.includes(option)) {
      setSelectedOption(option);
    } else {
      setSelectedOption("Received"); // Set a default option if the URL parameter is invalid
    }
    fetchData(option);
    setAction(option);
  }, [option]);

  const fetchData = async (option) => {
    try{

  
    const newDataCards = await getRequests("profile", option);
    if (JSON.stringify(newDataCards) !== JSON.stringify(dataCards)) {
      setDataCards(newDataCards);
      console.log(newDataCards);
    }
  
}catch (err) {
  
} finally {
  setIsLoading(false);
}
  }
  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    navigate(`/inbox/profiles/${opt}`);
  };
  console.log(dataCards,"jjjj")
  useEffect(() => {
    if (selectedOption) {
      // setDataCards([]);
      fetchData(selectedOption);
    } else {
      setDataCards([]);
    }
    setButtonClickFlag(false);
  }, [selectedOption, userId, buttonClickFlag]);

  useEffect(() => {
    socket.on(`profileRequestAcDec/${userId}`, (data) => {
      console.log("profile request accepted or declined:", data);
      fetchData(option);
    });
    socket.on(`profileRequestSent/${userId}`, (data) => {
      console.log("profile recieved:", data);
      fetchData(option);
    });

    return () => {
      socket.off(`profileRequestAcDec/${userId}`);
      socket.off(`profileRequestSent/${userId}`);
    };
  }, [socket, userId]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center md:mt-36  sm:mt-36 mt-9  md:gap-16 sm:gap-14 gap-6">
        <Link to={`/inbox/interests/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl  font-medium px-6 py-2 light-shadow cursor-pointer ${
              path === `/inbox/interests` && "activeheader"
            }`}
          >
            Interest Request
          </p>
        </Link>
        <Link to={`/inbox/profiles/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl light-shadow   font-medium px-6 py-2 cursor-pointer ${
              path.includes("/inbox/profiles") && "activeheader"
            }`}
          >
            Profile Request
          </p>
        </Link>
      </div>
      <div className="flex md:flex-row sm:flex-row flex-col  md:items-start sm:items-start items-center">
        <div className="flex flex-col md:px-16 px-6 sm:px-6 mt-9  sm:w-1/3 w-full sm:mt-20">
          <ul className="text-start md:border sm:border sm:border-primary md:py-2 md:border-primary flex md:flex-col flex-row justify-start  sm:flex-col  rounded-xl    overflow-x-scroll scrollbar-hide md:overflow-hidden sm:overflow-hidden ">
            {optionData.map((opt) => (
              <>
                <li
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className=" list-none font-semibold text-[15px]  bg-[#FCFCFC] py-1  capitalize md:mx-2 sm:mx-2 flex mt-1 items-center cursor-pointer rounded-lg"
                >
                  <Link
                    to={`/inbox/profile/${opt}`}
                    className={
                      selectedOption === opt
                        ? "bg-primary text-white  md:rounded-md rounded-xl md:mx-4 sm:rounded-md w-full md:px-3 sm:px-3 mt-1  py-2 px-6"
                        : "py-2 px-6   rounded-lg bg-[#FCFCFC]"
                    }
                  >
                    {opt}
                  </Link>
                </li>
                <hr className="border-primary mt-2 mx-6" />
              </>
            ))}
          </ul>
        </div>
        <div className="md:mt-9 sm:mt-16 mb-28">
        {isLoading ? (
  <>
    <div className="px-96  w-full mt-5">
      <Skeleton height={300} />
    </div>
    <div className="px-96  w-full mt-5">
      <Skeleton height={300} />
    </div>
  </>
) : dataCards?.length === 0 ? (
  <DataNotFound
    className="flex flex-col items-center md:ml-36  mt-11 sm:ml-28 sm:mt-20"
    message="No data available to show"
    linkText="Back to Dashboard"
    linkDestination="/user-dashboard"
  />
) : (
            dataCards?.map((item, index) => (
              <OptionDetails
                key={index}
                checkId={item.Id}
                option={item.value}
                overAllDataId={item.id || ""}
                actionType={item.actionType}
                isType={"profile"}
                action={action}
                isShortListedBy={item.isShortListedBy}
                isShortListedTo={item.isShortListedTo}
                isRequestBy={item.isRequestBy}
                isRequestTo={item.isRequestTo}
                differentiationValue={item.differentiationValue}
                setButtonClickFlag={setButtonClickFlag}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileReq;
