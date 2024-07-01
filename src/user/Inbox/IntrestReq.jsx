



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
import Loading from "../../components/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getCountries, getMasterData } from "../../common/commonFunction";
import Pagination from "../../Admin/comps/Pagination";
const socket = io(`https://admincs.gauravdesign.com`);

const ProfileReq = () => {
  const { userId } = useSelector(userDataStore);
  const [buttonFlag, setButtonFlag] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonClickFlag, setButtonClickFlag] = useState(false);
  const navigate = useNavigate();
  const { option } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [dataCards, setDataCards] = useState([]);
  const path = window.location.pathname;
  const [profession, setProfession] = useState([]);
  const [diet, setDiet] = useState([]);
  const [countries, setCountries] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [community, setCommunity] = useState([]);
  const [isInterestActive, setIsInterestActive] = useState(false);
  const [action, setAction] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [totalPagesCount, setTotalPagesCount] = useState({});

  const getRequests = async (type, option, page=1) => {
    try {
      if (!userId) {
        console.error("Error: userId is not present");
        return;
      }

      const response = await apiurl.get(
        `/api/${type}-request/${option}/${userId}`,{
          params: { page, limit: perPage }
        }
      );
      setButtonFlag(response.data.requests.map((item) => item));
      setTotalUsersCount(response.data.totalUsersCount);
      setTotalPagesCount(response.data.lastPage);
    
      setCurrentPage(page);
      console.log(
      "requestIn", response.data
      );

      if (path.includes("/recieved")) {
        return response.data.requests.map((item) => ({
          id: item._id,
          requestId: item[`${type}RequestTo`],
          actionType: item.action,
          Id: item[`${type}RequestTo`]._id,
          value: item[`${type}RequestBy`],
          isShortListedTo: item?.isShortListedTo,
          isShortListedBy: item?.isShortListedBy,
          isRequestTo: item?.isProfileRequestTo,
          isRequestBy: item?.isProfileRequestBy,
          differentiationValue: "To",
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
          isRequestBy: item?.isProfileRequestBy          ,
        }));
      } else {
        return response.data.requests.map((item) => ({
          id: item._id,
          actionType: item.action,
          requestId: item[`${type}RequestBy`],
          Id: item[`${type}RequestBy`]._id,
          value: item[`${type}RequestTo`],
          isShortListedTo: item?.isShortListedTo,
          isShortListedBy: item?.isShortListedBy,
          isRequestTo: item?.isProfileRequestTo,
          isRequestBy: item?.isProfileRequestBy,
          differentiationValue: "By",
        }));
      }
    } catch (error) {
      console.error(`Error getting ${type} requests:`, error);
      return [];
    }
  };
  useEffect(() => {
    if (option && optionData.includes(option)) {
      setSelectedOption(option);
    } else {
      setSelectedOption("Received"); // Set a default option if the URL parameter is invalid
    }
  }, [option]);

  useEffect(() => {
    socket.on(`interestRequestAcDec/${userId}`, (data) => {
      console.log("Interest request accepted or declined:", data);
      fetchDatas(option);
    });
    socket.on(`interestRequestSent/${userId}`, (data) => {
      console.log("Interest recieved:", data);
      fetchDatas(option);
    });

    return () => {
      socket.off(`interestRequestAcDec/${userId}`);
      socket.off(`interestRequestSent/${userId}`);
    };
  }, [socket, userId]);

  const fetchData = async (option, page=1) => {
    const newDataCards = await getRequests("interest", option, page);
    console.log(newDataCards);
    if (JSON.stringify(newDataCards) !== JSON.stringify(dataCards)) {
      setDataCards(newDataCards);
    }
    setButtonClickFlag(false);
  };

  const getInterestRequests = async (option) => {
    const interestRequests = await getRequests("interest", option);
    return interestRequests;
  };

  useEffect(() => {
    setSelectedOption(option || "Recieved");
    navigate(`/inbox/interests/${option || "Recieved"}`);
  }, [option, navigate]);


  const fetchDatas = async () => {

    try{
      setIsLoading(true);
    const newDataCards = await getInterestRequests(selectedOption);
    if (JSON.stringify(newDataCards) !== JSON.stringify(dataCards)) {
      setDataCards(newDataCards);
    }
    setButtonClickFlag(false)
  }catch(err){

  }finally {
    setIsLoading(false);
  }
  };


  useEffect(() => {
    setAction(option);
    fetchDatas(option);
  }, [selectedOption, buttonClickFlag]);

  useEffect(() => {
    if (selectedOption) {
      // setDataCards([]);
      fetchData(selectedOption);
    } else {
      setDataCards([]);
    }
  }, [selectedOption, userId, buttonClickFlag]);
  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    navigate(`/inbox/interests/${opt}`);
  };

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
      const handlePageChange = (pageNumber) => {
        // setIsLoading(true)
        // window.scrollTo(0, 0);
        setTimeout(() => {
          fetchData(selectedOption, pageNumber);
        }, 100); // 3 seconds delay
        
      };
  return (
    <>
      <Header />
      <div className="flex justify-center items-center md:mt-36  sm:mt-36 mt-9  md:gap-16 sm:gap-14 gap-6">
      <Link to={`/inbox/profiles/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl light-shadow   font-medium px-6 py-2 cursor-pointer `}
          >
            Profile Request
          </p>
        </Link>
        <Link to={`/inbox/interests/recieved`}>
          <p
            className={`bg-[#FCFCFC] rounded-xl  font-medium px-6 py-2 cursor-pointer ${
              (path === `/inbox/interests/recieved` ||
                path.includes("/inbox/interests/sent") ||
                path.includes("/inbox/interests/accepted") ||
                path.includes("/inbox/interests/declined")) &&
              "activeheader"
            }`}
          >
            Interest Request
          </p>
        </Link>
      
      </div>
      <div className="flex md:flex-row sm:flex-row flex-col  md:items-start sm:items-start items-center    ">
        <div className="flex flex-col md:px-16 px-6 sm:px-6 mt-9  sm:w-1/3 w-full sm:mt-20">
          <ul className="text-start md:border sm:border sm:border-primary md:py-2 md:border-primary flex md:flex-col flex-row justify-start  sm:flex-col  rounded-xl    overflow-x-scroll scrollbar-hide md:overflow-hidden sm:overflow-hidden">
            {optionData.map((opt) => (
              <>
                <li
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className="list-none font-semibold text-[15px]  bg-[#FCFCFC] py-1  capitalize md:mx-2 sm:mx-2 flex mt-1 items-center cursor-pointer rounded-lg "
                >
                  <Link
                    to={`/inbox/profiles/${opt}`}
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
            <div className="md:mx-3 w-[20rem] md:w-[39rem] sm:w-[30rem] mt-9  ">
      <Skeleton height={250} />
    </div>
     <div className="md:mx-3 w-[20rem] md:w-[39rem] sm:w-[30rem] mt-9  ">
     <Skeleton height={250} />
     </div>
            <div className="md:mx-52 mt-20 mx-6  ">
             <Loading />
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
            dataCards?.map(
              (item, index) => (
                console.log(item),
                (
                  <OptionDetails
                    key={index}
                    option={item.value}
                    checkId={item.Id || ""}
                    overAllDataId={item.id || ""}
                    isType={"interest"}
                    actionType={item.actionType}
                    action={action}
                    isShortListedBy={item.isShortListedBy}
                    isShortListedTo={item.isShortListedTo}
                    isRequestBy={item.isRequestBy}
                    isRequestTo={item.isRequestTo}
                    differentiationValue={item.differentiationValue}
                    setButtonClickFlag={setButtonClickFlag}
                    community={community}
                    diet={diet}
                    countries={countries}
                    profession = {profession}
                  />
                )
              )
            )
          )}
          {dataCards.length > 0 && (
        <div className="flex justify-center items-center mt-3 mb-20 ml-4">
          <Pagination
            currentPage={currentPage}
            hasNextPage={currentPage * perPage < totalUsersCount}
            hasPreviousPage={currentPage > 1}
            onPageChange={handlePageChange}
            totalPagesCount={totalPagesCount}
          />
        </div>
      )}
        </div>
      
      </div>
      
    </>
  );
};

export default ProfileReq;
