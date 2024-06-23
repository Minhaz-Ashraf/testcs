import React, { useEffect, useState } from "react";
import { getUser } from "../../../Stores/service/Genricfunc";
import { useSelector } from "react-redux";
import { userDataStore } from "../../../Stores/slices/AuthSlice";


const ChangeRegPopUp = ({isOpen, closePopUp}) => {
      const { userId } = useSelector(userDataStore);
const [isData, setIsData] = useState({})
   



        const fetchData = async () => {
          const userData = await getUser(userId)
          setIsData({
            userData
          })
        }

        useEffect(() => {
        fetchData();
      }, [userId]);


      function maskEmail(email) {
        if (!email) return ''; // Return an empty string or handle this case as needed
    
        // Split the email into parts before and after the '@' symbol
        let [localPart, domain] = email?.split('@');
    
        // If the domain is not gmail.com, return the original email (or you can handle this case differently)
        if (domain !== 'gmail.com') {
            return email;
        }
    
        // Get the last four letters of the local part
        let lastFour = localPart.slice(-3);
    
        // Create the masked email with asterisks and the last four letters
        let maskedEmail = '*****' + lastFour + '@' + domain;
    
        return maskedEmail;
    }
    
    
    // Example usage
    let email = isData?.userData?.user?.additionalDetails?.email
    let maskedEmail = maskEmail(email);
console.log(isData)
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center popup-backdrop z-50  sm:px-52  px-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white pb-9  rounded-lg md:w-[58%] w-full  relative p-9  ">
            <span className="flex flex-col items-center justify-center">
              <p className="text-center font-DMsans text-black font-semibold text-[16px] ">
                We have sent an email on  {maskedEmail}. Please verify to change your registered number.
              </p>

             
            </span>
            <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
            
              <span
                onClick={() => {
                  closePopUp();
                 
                }}
                className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
              >
                Okay
              </span>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default ChangeRegPopUp;
