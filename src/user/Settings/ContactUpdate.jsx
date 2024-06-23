import React, { useEffect, useState } from 'react';
import SideBar from '../Dashboard/SideBar';
import Header from '../../components/Header';
import { BackArrow } from '../../components/DataNotFound';
import { useDispatch, useSelector } from "react-redux";
import apiurl from "../../util";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { toast } from 'react-toastify';
import { getUser } from '../../Stores/service/Genricfunc';
import PhoneInput from 'react-phone-input-2';

const ContactUpdate = () => {
  const { userId } = useSelector(userDataStore);

  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const [contactUpdate, setContactUpdate] = useState({
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setContactUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (value, country) => {
    setCountryCode(country.dialCode);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
    setContactUpdate((prevState) => ({
      ...prevState,
      phone: `${country.dialCode}-${value.slice(country?.dialCode?.length)}`,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleUpdate = async (type) => {
    if (userId) {
      try {
        if( type === "email"){

        await apiurl.put(`/update-contact-info`, {
          userId,
           email: contactUpdate.email
        });
      }else{
        await apiurl.put(`/update-contact-info`, {
          userId,
          phone: contactUpdate.phone,
          email: contactUpdate.email
        });
      }

        toast.success("Contact updated");
      } catch (err) {
        toast.error('Error updating contact');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(userId);
      if (userData && userData?.user?.additionalDetails) {
        const data = userData.user.additionalDetails;
        setContactUpdate({
          email: data?.email || "",
          phone: data?.countryCode + data?.contact || "",
        });
      }
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <Header />
      <div className='mt-'>
        <SideBar />
      </div>
      <BackArrow className="sm:hidden md:hidden block"/>
      <div className='shadow md:px-9 py-3 px-6 mb-36 md:mb-5 md:mx-28 my-5 rounded-md md:ml-96 sm:ml-72 sm:mt-36 sm:mb-9 md:mt-40 mt-7 mx-6'>
        <span>
          <p className="font-semibold font-montserrat mt-8 md:text-[22px] text-[18px]">Email and Contact Settings</p>
          <p className='pt-3'>Change Email Id</p>
          <input 
            type="text" 
            className='bg-[#F0F0F0] rounded-md py-3 mt-2 md:w-[65%] w-full px-3'
            value={contactUpdate.email}
            onChange={(e) => handleInput(e)}
            name="email" // Unique name for email input
            placeholder='Email Id' 
          />
          <div className='flex items-center justify-center gap-5 mx-9 mb-9 font-DMsans mt-8'>
            <span className='border border-primary text-primary px-5 rounded-md py-2 cursor-pointer'>Cancel</span>
            <span onClick={() => handleUpdate("email")} className='bg-primary text-white px-7 rounded-md py-2 cursor-pointer'>Update</span>
          </div>
        </span>

        <span>
          <p className="font-semibold font-montserrat mt-8 md:text-[22px] text-[18px]">Change the contact Number</p>
          <p className='pt-3'>Change Phone Number</p>
          <label>
          <PhoneInput
              className="mt-3 mb-9"
              containerStyle={{ width: "50%" }}
              buttonStyle={{ width: "0%",  backgroundColor: "transparent", }}
              inputStyle={{ width: "130%", height: "3rem" }}
              value={contactUpdate.phone}
              onChange={handleChange}
              inputProps={{
                required: true,
              }}
            />
          </label>
          {!valid && (
            <p className="text-start text-[12px] absolute bottom-4 mx-20 md:mx-28 text-red-600">
              Please enter a valid phone number*
            </p>
          )}
          <div className='flex items-center justify-center gap-5 mx-9 mb-9 font-DMsans mt-8'>
            <span className='border border-primary text-primary px-5 rounded-md py-2 cursor-pointer'>Cancel</span>
            <span onClick={handleUpdate} className='bg-primary text-white px-7 rounded-md py-2 cursor-pointer'>Update</span>
          </div>
        </span>
      </div>
    </>
  );
};

export default ContactUpdate;
