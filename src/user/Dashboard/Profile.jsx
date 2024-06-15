import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { FiEdit } from "react-icons/fi";
import BasicDetail from "../Edit/BasicDetail";
import PersonalDetail from "../Edit/PersonalDetail";
import CarrierDetail from "../Edit/CarrierDetail";
import FaimllyDetail from "../Edit/FaimlyDetail";
import InterestDetail from "../Edit/InterestDetail";
import { FaEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { getUser } from "../../Stores/service/Genricfunc";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { useSelector } from "react-redux";
import apiurl from "../../util";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { BackArrow } from "../../components/DataNotFound";

const Profile = () => {
  const location = useLocation();
  const userdetails = useSelector(userDataStore);
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);
  const [basicDetails, setBasicDetails] = useState([]);
  const [profileEdit, setProfileEdit] = useState({
    fname: "",
    mname: "",
    lname: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirthCountry: "",
    placeOfBirthState: "",
    placeOfBirthCity: "",
    post: "",
    manglik: "",
    horoscope: "",
    additionalDetails: {},
    familyDetails: {},
    careerDetails: {},
    selfDetails: {},
  });
  const { userId } = useSelector(userDataStore);
  const [openAbout, setOpenAbout] = useState(false);
  const [PersonalApp, setPersonalApp] = useState(false);
  const [country, setCountry] = useState([]);
  const [response, setResponse] = useState(null);
  const [aboutYourSelf, setAboutYourself] = useState("");
  const [profileAppearence, setProfileAppearence] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userID, setUserID] = useState();
  const [profileData, setProfileData] = useState([]);
  const [careerDetails, setCarrerDetails] = useState(null);
  const [isUserData, setIsUserData] = useState(false);

  const timeFormat = (ampm) =>
    ampm ? dayjs(`1/1/1 ${ampm}`, { locale: "en" }).format("hh:mm A") : null;

  const fetchUserData = async () => {
    if (userId !== userdetails.userId) {
      setHide(false);
      setShowProfile(true);
    } else {
      setHide(true);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUser = async () => {
    {
      var userId = null;
      if (location.state != null && location.state && location.state.userId) {
        userId = location.state.userId;
      } else {
        userId = userdetails.userId;
      }
      console.log(userId, userdetails.userId, location.state);
      if (userId !== userdetails.userId) {
        setHide(false);
        setShowProfile(true);
      } else {
        setHide(true);
      }
      setUserID(userId);
      try {
        setLoading(true);
        const userData = await getUser(userId);
        setIsUserData(false);
        setProfileEdit(userData?.user);
        setIsUserData(userData?.user);
        console.log(userData, "loop");
        const formData = userData?.user;

        const perosnalData = userData?.user?.additionalDetails;
        const educationData = userData?.user?.careerDetails;
        const additionalDetails = userData?.user?.familyDetails;
        const selfDetails = userData?.user?.selfDetails;
        setProfileData([
          formData,
          perosnalData,
          educationData,
          additionalDetails,
          selfDetails,
        ]);

        setResponse(formData?.userId);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    }
  };
  useEffect(() => {
    if (showProfile) {
      setOpenAbout(false);
      setPersonalApp(false);
    }
    console.log("profile6565")
  }, [userId, showProfile]);

  useEffect(() => {
    fetchUser();
    // console.log("profile")
  }, [userId]);

  async function editTexthandler(type) {
    if (type === "about-yourself" && !aboutYourSelf.trim()) {
      toast.error("Please fill the required fields");
      console.log("About Yourself cannot be empty");
      return; // Exit the function without making the API call
    }
    var body = {
      type,
      text: type == "personal-appearance" ? profileAppearence : aboutYourSelf,
    };
    try {
      const response = await apiurl.post(
        `/text-detail-change/${userdetails.userId}`,
        body
      );
      if (type == "personal-appearance") {
        setPersonalApp(false);
      } else {
        setOpenAbout(false);
      }
      fetchUser();
      toast.success("Data added successfully");
    } catch (error) {
      console.error("Error updating text:", error);
    }
  }

  const maritalStatusMapping = {
    single: "Single",
    awaitingdivorce: "Awaiting Divorce",
    divorcee: "Divorcee",
    widoworwidower: "Widow or Widower",
  };
  const transformedMaritalStatus =
    maritalStatusMapping[profileData[1]?.maritalStatus] || "NA";

  if (loading) {
    return (
      <>
        <div className="px-40  w-full mt-20 ">
          <Skeleton height={300} />{" "}
        </div>
        <div className="px-40  w-full mt-7 ">
          <Skeleton height={90} />
        </div>
        <div className="px-40  w-full mt-7 ">
          <Skeleton height={90} />
        </div>
      </>
    );
  }
console.log(profileData,"lpl");
  return (
    <>
     {!showProfile && (
      <>
      <Header />
      <BackArrow
        className="absolute md:ml-24 md:mt-9 sm:mt-28 w-full md:w-52 overflow-hidden"
      />
            <div id={`profile-${userId}`} className=" md:mx-52 flex flex-col   sm:mx-20 mx-6 md:mt-20 sm:mt-36 mt-28  overflow-hidden mb-20"></div>
      </>
    )}
      <BackArrow
        className="absolute md:ml-24 md:mt-0 sm:mt-28 w-full md:w-52 overflow-hidden"
      />

      <div id={`profile-${userId}`} className=" md:mx-52 flex flex-col   sm:mx-20 mx-6 md:mt-5 sm:mt-36 mt-28  overflow-hidden mb-20">
        <div className=" mx-1">
          <div className="shadow rounded-xl    py-11 mt-9 my-5 relative w-full h-[36rem] md:h-full sm:h-96 ">
            <span className="flex md:flex-row sm:flex-row flex-col mx-6 md:mx-0 sm:mx-0  items-center">
              <img
                src={profileData[4]?.profilePictureUrl}
                alt=""
                className="rounded-full  h-40  w-40 border-2 border-primary  mx-16"
              />
              <span>
                <span
                  onClick={(prev) => {
                    setShowProfile(!showProfile);
                  }}
                  className={`flex items-center absolute md:right-9  mt-64 sm:mt-60 w-44   md:mt-0 mx-12 md:mx-0 sm:mx-0  font-extralight bg-primary text-white py-3 px-3 rounded-md ${
                    !hide && "hidden"
                  } cursor-pointer`}
                >
                  <span className=" pe-3">
                    {!showProfile ? <FaEye /> : <FiEdit />}
                  </span>
                  <span className="">
                    {!showProfile ? "Preview Full Profile" : "Edit Details"}
                  </span>
                </span>
                <p className="font-semibold text-[23px] mt-3 font-montserrat text-center md:text-start sm:text-start">
                  {profileData[0]?.basicDetails?.name?.replace("undefined", "")}
                </p>
                <p className="font-semibold text-[16px] text-center md:text-start sm:text-start">
                  ( {response} )
                </p>
                <span className="flex flex-row  items-baseline md:gap-36 sm:gap-20 gap-9 font-DMsans">
                  <span className=" mt-4  text-[14px]">
                    <p className="py-1">
                      {" "}
                      {profileData[0]?.basicDetails?.age}yrs, {profileData[1]?.height}ft'
                    </p>
                    <p className="py-1">
                      {profileData[0]?.basicDetails?.dateOfBirth || "NA"}
                    </p>
                    <p className="py-1">{transformedMaritalStatus || "NA"}</p>
                    <p className="py-1">
                      {profileData[2]?.professionctype || "NA"}
                    </p>
                  </span>
                  <span className="text-[14px] text-end md:text-start sm:text-start">
                    {console.log({ profileEdit, userdetails })}
                    <p className="py-1">
                      {profileData[1]?.stateatype},{" "}
                      {profileData[1]?.countryatype}
                    </p>
                    <p className="py-1">
                      {profileData[0]?.basicDetails?.timeOfBirth || "NA"}
                    </p>
                    <p className="py-1">{profileData[1]?.dietatype}</p>
                    <p className="py-1">{profileData[3]?.communityftype}</p>
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
        {/* {console.log({ userData?.user })} */}

        {/* About */}
        <div className="shadow rounded-xl  py-3 mt-9 my-5 mx-1">
          <span className="flex justify-between items-center text-primary px-10 py-2 ">
            <p className="  font-medium  text-[20px]">
              About Yourself <span className="text-primary">*</span>
            </p>
            <span className="text-[20px] cursor-pointer flex items-center font-DMsans">
              <span
                onClick={() => setOpenAbout((prev) => !prev)}
                className="text-[20px] cursor-pointer flex items-center font-DMsans"
              >
                {" "}
                {!showProfile && (
                  <>
                    {!openAbout ? (
                      <>
                        <FiEdit />
                        <span className=" px-3 text-[14px]">Edit</span>{" "}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </span>
            </span>
          </span>
          <hr className="mx-9" />

          <p className="px-9 py-4 font-DMsans font-extralight text-[15px]">
            {profileData[4]?.aboutYourself}
          </p>
          {openAbout && (
            <>
              <textarea
                className="px-9 py-4 font-DMsans font-extralight text-[15px] w-full scrollbar-hide focus:outline-none"
                onChange={(e) => {
                  setAboutYourself(e.target.value);
                }}
              >
                {profileData[4]?.aboutYourself}
              </textarea>

              <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans mt-9">
                <span
                  onClick={() => setOpenAbout((prev) => !prev)}
                  className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
                >
                  Cancel
                </span>
                <span
                  onClick={() => editTexthandler("about-yourself")}
                  className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
                >
                  Save
                </span>
              </div>
            </>
          )}
        </div>
        {(!showProfile || !profileData[1]?.personalAppearance == "") && (
          <div className="shadow rounded-xl  py-3 mt-9 my-5 mx-1">
            <span className="flex justify-between items-center text-primary px-10 py-2">
              <p className="  font-medium  text-[20px]">Personal Appearance</p>
              <span className="text-[20px] cursor-pointer flex items-center font-DMsans">
                <span
                  onClick={() => setPersonalApp((prev) => !prev)}
                  className="text-[20px] cursor-pointer flex items-center font-DMsans"
                >
                  {!showProfile && (
                    <>
                      {" "}
                      {!PersonalApp ? (
                        <>
                          <FiEdit />
                          <span className=" px-3 text-[14px]">Edit</span>{" "}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </span>
              </span>
            </span>
            <hr className="mx-9" />
            <p className="px-9 py-4 font-DMsans font-extralight text-[14px]">
              {profileEdit && profileData[1]?.personalAppearance}
            </p>
            {PersonalApp && (
              <>
                <textarea
                  className="px-9 py-4 font-DMsans font-extralight text-[15px] w-full scrollbar-hide focus:outline-none"
                  onChange={(e) => {
                    setProfileAppearence(e.target.value);
                  }}
                >
                  {profileEdit && profileData[1]?.personalAppearance}
                </textarea>

                <div className="flex items-center justify-end gap-5 mx-9 mb-9 font-DMsans mt-9">
                  <span
                    onClick={() => setPersonalApp((prev) => !prev)}
                    className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
                  >
                    Cancel
                  </span>
                  <span
                    onClick={() => editTexthandler("personal-appearance")}
                    className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
                  >
                    Save
                  </span>
                </div>
              </>
            )}
          </div>
        )}
        {showProfile && (
          <div className="shadow rounded-xl  py-3 mt-9 my-5 mx-1">
            <span className="flex justify-between items-center text-primary px-10 py-2">
              <p className="  font-medium  text-[20px]">Images </p>
            </span>
            <hr className="mx-9" />
            <div className="flex flex-wrap gap-3 mt-12 mb-9 mx-10">
              {profileEdit &&
                profileEdit?.selfDetails.userPhotosUrl?.map((img) => (
                  <img
                    src={img}
                    className="border border-1  border-primary rounded-xl "
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                ))}
            </div>
          </div>
        )}
        <div className="mx-1">
          <BasicDetail
            showProfile={showProfile}
            country={country}
            basicDetails={basicDetails}
            userID={userID}
            location={location?.state?.location || ""}
            setShowProfile={setShowProfile}
            getUser={getUser}
            profileData={profileData}
            isUserData={isUserData}
            setIsUserData={setIsUserData}
          />
        </div>
        <div className="mx-1">
          <PersonalDetail
            showProfile={showProfile}
            country={country}
            additionalDetails={profileEdit?.additionalDetails}
            userID={userID}
            location={location?.state?.location || ""}
            setShowProfile={setShowProfile}
            getUser={getUser}
            profileData={profileData}
          />
        </div>
        <div className="mx-1">
          <CarrierDetail
            showProfile={showProfile}
            country={country}
            careerDetails={careerDetails}
            userID={userID}
            location={location?.state?.location || ""}
            setShowProfile={setShowProfile}
            getUser={getUser}
            profileData={profileData}
          />
        </div>
        {/* Faimly Details */}
        <div className="mx-1">
          <FaimllyDetail
            showProfile={showProfile}
            country={country}
            familyDetails={profileEdit?.familyDetails}
            userID={userID}
            location={location?.state?.location || ""}
            setShowProfile={setShowProfile}
            getUser={getUser}
            profileData={profileData}
            isUserData={isUserData}
          />
        </div>
        <div className="mx-1 my-1">
          <InterestDetail
            showProfile={showProfile}
            country={country}
            selfDetails={profileEdit?.selfDetails}
            userID={userID}
            location={location?.state?.location || ""}
            setShowProfile={setShowProfile}
            getUser={getUser}
            profileData={profileData}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
