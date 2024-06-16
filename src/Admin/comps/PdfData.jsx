import React, { useEffect, useRef, useState } from 'react';
import { getUser } from '../../Stores/service/Genricfunc';
import { useSelector } from 'react-redux';
import { userDataStore } from '../../Stores/slices/AuthSlice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { logo } from '../../assets';

const PdfData = () => {
  const { userId } = useSelector(userDataStore);
  const userdetails = useSelector(userDataStore);

  const [PersonalApp, setPersonalApp] = useState(false);

  const [response, setResponse] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userID, setUserID] = useState();
  const [profileData, setProfileData] = useState([]);

  const [isUserData, setIsUserData] = useState(false);
  const [profileEdit, setProfileEdit] = useState({});
  const [career, setCareer] = useState({});
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);

  const fetchUser = async () => {
    var userId = null;
    if (location.state != null && location.state && location.state.userId) {
      userId = location.state.userId;
    } else {
      userId = userdetails.userId;
    }

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
      const data = profileData[2];
      setCareer({
        university: data['school/university'] || '',
      });
      setResponse(formData?.userId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showProfile) {
      setOpenAbout(false);
      setPersonalApp(false);
    }
  }, [userId, showProfile]);

  useEffect(() => {
    fetchUser();
  }, [userId]);



  const pdfRef = useRef();
  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const totalPages = Math.ceil(imgProps.height / pdf.internal.pageSize.getHeight());

      let y = 0;
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, -y, pdfWidth, pdfHeight);
        y += pdf.internal.pageSize.getHeight();
      }

      pdf.save('download.pdf');
    });
  };
  const maritalStatusMapping = {
    single: "Single",
    awaitingdivorce: "Awaiting Divorce",
    divorcee: "Divorcee",
    widoworwidower: "Widow or Widower",
  };
  const transformedMaritalStatus =
    maritalStatusMapping[profileData[1]?.maritalStatus] || "NA";
  return (
    <>



<div ref={pdfRef}>
<span>
        <Link to="/">
          {" "}
          <img
            src={logo}
            alt="logo"
            className="md:w-[8%] sm:w-[14%] w-20 md:mx-12 mx-6 mt-3 cursor-pointer"
          />
        </Link>
      </span>
<div id={`profile-${userId}`} className="  flex flex-col  md:mx-52 sm:mx-20 mx-6  overflow-hidden mb-20">
        <div className=" mx-1">
          <div className="bg-[#fcfcfc] rounded-xl    py-11 mt-9 my-5 relative w-full h-[36rem] md:h-full sm:h-96 ">
            <span className="flex md:flex-row sm:flex-row flex-col mx-6 md:mx-0 sm:mx-0  items-center">
              <img
                src={profileData[4]?.profilePictureUrl}
                alt=""
                className="rounded-full  h-40  w-40 border-2 border-primary  mx-16"
              />
              <span>
          <span className='flex flex-col'>
                <p className="font-semibold text-[23px] mt-3 font-montserrat text-center md:text-start sm:text-start">
                  {profileData[0]?.basicDetails?.name?.replace("undefined", "")}
                </p>
                <p className="font-semibold text-[16px] text-center md:text-start sm:text-start">
                  ( {response} )
                </p>
                </span>
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
        <div className="bg-[#fcfcfc] rounded-xl  py-3 mt-9 my-5 mx-1">
          <span className="flex justify-between items-center text-primary px-10 py-2 ">
            <p className="  font-medium  text-[20px]">
              About Yourself <span className="text-primary">*</span>
            </p>
            <span className="text-[20px] cursor-pointer flex items-center font-DMsans">
              <span
                
                className="text-[20px] cursor-pointer flex items-center font-DMsans"
              >
               
              </span>
            </span>
          </span>
          <hr className="mx-9" />

          <p className="px-9 py-4 font-DMsans font-extralight text-[15px]">
            {profileData[4]?.aboutYourself}
          </p>
         
           
        </div>
      
          <div className="bg-[#fcfcfc] rounded-xl  py-3 mt-9 my-5 mx-1">
            <span className="flex justify-between items-center text-primary px-10 py-2">
              <p className="  font-medium  text-[20px]">Personal Appearance</p>
              <span className="text-[20px] cursor-pointer flex items-center font-DMsans">
                <span
                
                  className="text-[20px] cursor-pointer flex items-center font-DMsans"
                >
                
                </span>
              </span>
            </span>
            <hr className="mx-9" />
            <p className="px-9 py-4 font-DMsans font-extralight text-[14px]">
              { profileData[1]?.personalAppearance}
            </p>
          
            </div>       
      
        
          <div className="bg-[#fcfcfc] rounded-xl  py-3 mt-9 my-5 mx-1">
            <span className="flex justify-between items-center text-primary px-10 py-2">
              <p className="  font-medium  text-[20px]">Images </p>
            </span>
            <hr className="mx-9" />
            <div className="flex flex-wrap gap-3 mt-12 mb-9 mx-10">
              {
                profileEdit?.selfDetails?.userPhotosUrl?.map((img) => (
                  <img
                    src={img}
                    className="border border-1  border-primary rounded-xl "
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                ))}
            </div>
          </div>


          <div className=' mx-1'>
        <div className="bg-[#fcfcfc] rounded-xl   py-3  mt-9 my-5 w-full ">
        <span className="flex justify-between items-center text-primary px-10 py-2 ">
          <p className="  font-medium  text-[20px]">Basic Details</p>
          <span
          
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
           
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex md:flex-row flex-col sm:flex-row  items-baseline justify-between md:pe-80 sm:pe-20 font-DMsans px-10 text-start pb-8 overflow-hidden">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Profile Created For</p>
            <p className="font-light capitalize">
              {/* {console.log({ response })} */}
              {profileData[0]?.createdBy[0]?.createdFor || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Name</p>
            <p className=" font-light">
              {/* {detailBasic?.name != undefined ? detailBasic?.fname : ""}{" "}
              {detailBasic?.mname !== undefined ? detailBasic?.mname : ""}{" "}
              {detailBasic?.lname !== undefined ? detailBasic?.lname : ""} */}
              {profileData[0]?.basicDetails?.name?.replace("undefined", "") || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Gender</p>
            <p className=" font-light">
              {profileData[0]?.basicDetails?.gender === "M" ? " Male" : "Female" || "NA"}
            </p>

            <p className=" pt-4 font-medium">Birth Date</p>
            <p className=" font-light">{profileData[0]?.basicDetails?.dateOfBirth}</p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Time of Birth</p>
            <p className=" font-light">
              {profileData[0]?.basicDetails?.timeOfBirth || "NA"}
            </p>

            <p className=" pt-4 font-medium"> Age</p>
            <p className=" font-light">{profileData[0]?.basicDetails?.age || "NA"}yrs</p>

            <p className=" pt-4 font-medium"> Place of Birth</p>
            <p className=" font-light ">
              {profileData[0]?.basicDetails?.citybtype || "NA"},
              {profileData[0]?.basicDetails?.statebtype || "NA"},
              {profileData[0]?.basicDetails?.countrybtype || "NA"}
            </p>

            <p className=" pt-4 font-medium">Manglik Status</p>
            <p className=" font-light capitalize">
              {profileData[0]?.basicDetails?.manglik}
            </p>
          </span>
        </span>
        </div></div>

        <div className=' mx-1'>
        <div className="bg-[#fcfcfc] rounded-xl py-3 mt-9 my-5  w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Personal Details</p>
        
        </span>

        <hr className="mx-9  " />
        <span className="md:flex sm:flex md:flex-row sm:flex-row items-baseline justify-between font-DMsans  px-10 md:pe-52 sm:pe-20 text-start pb-8">
          <div className=" mt-4  text-[14px] mx-10 md:mx-0 sm:mx-0">
            <p className="  font-medium "> Height</p>
            <p className=" font-light">
              {profileData[1]?.height ? profileData[1]?.height : "NA"}
            </p>
            <p className="  font-medium"> Weight</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.weight ? profileData[1]?.weight : "NA"} Kg
            </p>
            <p className=" pt-4 font-medium"> Presently Settled in Country</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.countryatype
                ? profileData[1]?.countryatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Presently Settled in State</p>
            <p className="font-light">
              {/* {console.log({ detailpersonal })} */}
              {profileData[1]?.stateatype
                ? profileData[1]?.stateatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Presently Settled in City</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.cityatype
                ? profileData[1]?.cityatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Open to Relocate in Future</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.relocationInFuture
                ? profileData[1]?.relocationInFuture
                : "NA"}{" "}
            </p>
          </div>
          <div className="text-[14px] mt-4 mx-10">
            <p className="  font-medium"> Diet</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.dietatype
                ? profileData[1]?.dietatype
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Alcohol Consumption</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.alcohol
                ? profileData[1]?.alcohol
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium"> Smoking Preference</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.smoking
                ? profileData[1]?.smoking
                : "NA"}{" "}
            </p>
            <p className=" pt-4 font-medium">Martial Status</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.maritalStatus
                ? profileData[1]?.maritalStatus
                : "NA"}{" "}
            </p>
            {console.log(location)}
            {/* {location?.includes('interests') && <> */}
            <p className=" pt-4 font-medium">Contact Details</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.contact || "NA"}
            </p>
            <p className=" pt-4 font-medium">Email Address</p>
            <p className="font-light">
              {" "}
              {profileData[1]?.email || "NA"}
            </p>
            {/* </>} */}
          </div>
        </span>
</div>
</div>

<div className=' mx-1'>

<div className="bg-[#fcfcfc] rounded-xl  py-3 mt-9 my-5 w-full overflow-hidden">
          <span className="flex justify-between items-center text-primary px-10 py-2">
            <p className="  font-medium  text-[20px]">Career Details</p>
            <span
            
              className="text-[20px] cursor-pointer flex items-center font-DMsans"
            >
           
            </span>
          </span>
          <hr className="mx-9" />
          <span className="flex md:flex-row sm:flex-row flex-col  items-baselinev justify-between md:pe-60 sm:pe-20 font-DMsans px-10 text-start pb-8">
            <span className=" mt-4  text-[14px]">
              <p className="  font-medium"> Education</p>
              <p className="font-light">
                {profileData[2]?.educationctype || "NA"}
              </p>

              <p className=" pt-4 font-medium"> University</p>
              <p className=" font-light">
                {career?.university || "NA"}
              </p>
              <p className=" pt-4 font-medium"> Highest Qualification</p>
              <p className=" font-light">
                {profileData[2]?.highestQualification
                  ? profileData[2]?.highestQualification
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium">Profession</p>
              <p className=" font-light">
                {profileData[2]?.professionctype || "NA"}
              </p>
            </span>
            <span className="text-[14px] mt-4">
              <p className="  font-medium"> Current Designation</p>
              <p className=" font-light">
                {profileData[2]?.currentDesignation
                  ? profileData[2]?.currentDesignation
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium">Previous Occupation</p>
              <p className=" font-light">
                {profileData[2]?.previousOccupation
                  ? profileData[2]?.previousOccupation
                  : "NA"}
              </p>
              <p className=" pt-4 font-medium"> Approximate Annual Income</p>
              <p className=" font-light">
                {profileData[2]?.annualIncomeUSD
                  ? profileData[2]?.annualIncomeUSD
                  : "NA"}{" "}
                USD
              </p>
            </span>
          </span>
        </div>
</div>

        <div className=' mx-1'>
        <div className="bg-[#fcfcfc] rounded-xl  py-3 mt-9 my-5 w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">Family Details</p>
          <span
            
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            
          </span>
        </span>
        

        <hr className="mx-9" />
        <span className="flex md:flex-row sm:flex-row flex-col items-baseline justify-between md:pe-60  pe-20 font-DMsans px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium">Father’s Name</p>
            <p className=" font-light">
              {profileData[3]?.fatherName ? profileData[3]?.fatherName : "NA"}
            </p>
            <p className=" pt-4 font-medium"> Father’s Occupation</p>
            <p className=" font-light">
              {profileData[3]?.fatherOccupation
                ? profileData[3]?.fatherOccupation
                : "NA"}
            </p>
            <p className=" pt-4 font-medium"> Mother’s Name</p>
            <p className=" font-light">
              {profileData[3]?.motherName ? profileData[3]?.motherName : "NA"}
            </p>
            <p className=" pt-4 font-medium">Mother’s Occupation</p>
            <p className=" font-light">
              {profileData[3]?.motherOccupation
                ? profileData[3]?.motherOccupation
                : "NA"}
            </p>
            <p className="pt-4 font-medium">Siblings</p>
            {profileData[3]?.users &&
              profileData[3]?.users.map((userDetail, index) => (
                <div key={index} className="flex capitalize">
                  <p className="font-light">{userDetail.gender} - </p>
                  <p className="font-light"> {userDetail.option}</p>
                </div>
              ))}
            <p className=" pt-4 font-medium">Lives with Family</p>
            <p className=" font-light">
              {profileData[3]?.withFamilyStatus || "NA"}
            </p>
          </span>
          <span className="text-[14px] mt-4">
            <p className="  font-medium"> Family Settled (Country)</p>
            <p className=" font-light">
              {profileData[3]?.countryftype || "NA"}
            </p>
            <p className=" pt-4 font-medium">Family Settled (State)</p>
            <p className=" font-light">{profileData[3]?.stateftype || "NA"}</p>
            <p className=" pt-4 font-medium"> Family Settled (City)</p>
            <p className=" font-light">{profileData[3]?.cityftype || "NA"}</p>
            <p className=" pt-4 font-medium">Religion</p>
            <p className=" font-light">Hinduism</p>
            <p className=" pt-4 font-medium">Community</p>
            <p className=" font-light">
              {profileData[3]?.communityftype || "NA"}
            </p>
            <p className=" pt-4 font-medium">
              Family Annual Income (
              {profileData[2]?.currencyType})
            </p>
        
            <p className=" font-light">
              {
                profileData[3]?.annualIncomeValue
                || "NA"}
            </p>
          </span>
        </span>
</div>
</div>


<div className=' mx-1 mb-1'>
<div className="bg-[#fcfcfc] rounded-xl    py-3 mt-9 my-5   md:mb-0 mb-36 sm:mb-0  w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">
            Additional Details & Interests
          </p>
          <span
        
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
          
          </span>
        </span>
        <hr className="mx-9" />
        <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between font-DMsans md:pe-56 pe-9 px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Interests</p>
            <p className=" font-light md:pe-36">
              {profileData[4]?.interestsTypes || "NA"}
            </p>
            <p className=" pt-4 font-medium">Fun</p>
            <p className=" font-light md:pe-40">
              {profileData[4]?.funActivitiesTypes || "NA"}
            </p>
          </span>
          <span className="text-[14px] mt-5">
            <p className="  font-medium">Fitness</p>
            <p className=" font-light ">
              {profileData[4]?.fitnessTypes || "NA"}
            </p>
            <p className=" pt-4 font-medium">Other Interests</p>
            <p className=" font-light ">{profileData[4]?.otherTypes || "NA"}</p>
          </span>
        </span>
        </div>
</div>
</div>

</div>
<button
          onClick={handleDownloadPDF}
          className="bg-primary text-white px-4 py-2 rounded-lg "
        >
          Download PDF
        </button>


{/* <UserOperation onLoadPdf={handleDownloadPDF}/> */}
    </>
  )
}

export default PdfData