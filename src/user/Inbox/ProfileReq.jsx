import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import OptionDetails from "./optionDetails";
import { optionData } from "../../DummyData/userProfile";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import io from "socket.io-client";
import DataNotFound from "../../components/DataNotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../../components/Loading";
import {
  getCountries,
  getMasterData,
} from "../../common/commonFunction";

const socket = io(import.meta.env.VITE_APP_PROD_BASE_URL);

const ProfileReq = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { userId } = useSelector(userDataStore);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [profession, setProfession] = useState([]);
  const [buttonClickFlag, setButtonClickFlag] = useState(false);
  const [diet, setDiet] = useState([]);
  const [community, setCommunity] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const { option } = useParams();
  const [dataCards, setDataCards] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const path = window.location.pathname;
  const loader = useRef(null);

  const getRequests = async (type, option, page) => {
    try {
      if (!userId) {
        console.error("Error: userId is not present");
        return;
      }
      console.log(`Fetching data for page ${page}`);
      const response = await apiurl.get(
        `/api/${type}-request/${option}/${userId}?page=${page}&limit=20`
      );
      console.log(response.data.requests);

      if (response.data.requests.length === 0) {
        setHasMore(false);
      }

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
  };

  const fetchData = async (option, page) => {
    try {
      // if (isFetching || !hasMore) return;
      // setIsFetching(true);
      setIsLoading(true);

      const newDataCards = await getRequests("profile", option, page);
      console.log(newDataCards, "Fetched Data");

      if (newDataCards.length === 0) {
        setHasMore(false);
      } else {
        setDataCards((prevData) => {
          const combinedData = [...prevData, ...newDataCards];
          const uniqueData = Array.from(
            new Set(combinedData.map((item) => item.id))
          ).map((id) => combinedData.find((item) => item.id === id));
          return uniqueData;
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
      // setIsFetching(false);
    }
  };


  useEffect(() => {
    if (option && optionData.includes(option)) {
      setSelectedOption(option);
    } else {
      setSelectedOption("recieved"); // Set a default option if the URL parameter is invalid
    }
    setPage(1);
    setDataCards([]);
    setHasMore(true);
    setAction(option)
    fetchData(option, 1);
  }, [option]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore, isFetching]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isFetching) {
      console.log("Bottom reached, fetching more data...");
      fetchData(selectedOption, page);
    }
  };

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    navigate(`/inbox/profiles/${opt}`);
  };

  useEffect(() => {
    if (selectedOption) {
      fetchData(selectedOption, 1);
    } else {
      setDataCards([]);
    }
  }, [selectedOption, userId]);

  useEffect(() => {
    socket.on(`profileRequestAcDec/${userId}`, (data) => {
      console.log("profile request accepted or declined:", data);
      fetchData(option, 1);
    });
    socket.on(`profileRequestSent/${userId}`, (data) => {
      console.log("profile recieved:", data);
      fetchData(option, 1);
    });
    return () => {
      socket.off(`profileRequestAcDec/${userId}`);
      socket.off(`profileRequestSent/${userId}`);
    };
  }, [socket, userId]);

  useEffect(() => {
    async function getData() {
      try {
        const profession = await getMasterData("profession");
        setProfession(profession);
        const diet = await getMasterData("diet");
        setDiet(diet);
        const community = await getMasterData("community");
        setCommunity(community);
        const countries = await getCountries();
        setCountries(countries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Header />
      <div className="flex justify-center items-center md:mt-36  sm:mt-36 mt-9  md:gap-16 sm:gap-14 gap-6">
      <Link to={`/inbox/profiles/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl light-shadow   font-medium px-6 py-2 cursor-pointer ${
              path.includes("/inbox/profiles") && "activeheader"
            }`}
          >
            Profile Request
          </p>
        </Link>
    
    
        <Link to={`/inbox/interests/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl  font-medium px-6 py-2 light-shadow cursor-pointer ${
              path === `/inbox/interests` && "activeheader"
            }`}
          >
            Interest Request
          </p>
        </Link>
     
      </div>
      {/* <Skeleton height={500} /> */}
      <div className="flex md:flex-row sm:flex-row flex-col  md:items-start sm:items-start items-center">
        <div className="flex flex-col md:px-16 px-6 sm:px-6 mt-9  sm:w-1/3 w-full sm:mt-20">
          <ul className="text-start md:border sm:border sm:border-primary md:py-2 md:fixed md:border-primary flex md:flex-col flex-row justify-start  sm:flex-col  rounded-xl    overflow-x-scroll scrollbar-hide md:overflow-hidden sm:overflow-hidden md:w-72 ">
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
  <div className="mx-3 mt-9">
      <Skeleton height={250} />
    </div>
    <div className="mx-3 mt-9">
    <Skeleton height={250} />
    </div>
    <div className="mx-52 mt-20">
    <Loading/>
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
                states={states}
                    community={community}
                    diet={diet}
                    countries={countries}
                    profession = {profession}
              />
            ))
          )}
        </div>
        <div ref={loader} />
      </div>
    </>
  );
};

export default ProfileReq;
