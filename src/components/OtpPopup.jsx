// Modal.js
import React, { useState } from 'react';

import 'react-phone-input-2/lib/style.css';


const OtpPopup = ({ onClose }) => {

  

  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const Otp = () => {

    console.log('Logging in with:', { username, password });

    onClose();
  };

  ;

  return (
    <>
      
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 bg-white p-7 rounded-lg max-w-md w-full ">
            <div className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-600  "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</div>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Verify your mobile number</h2>
                
                <form>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-semibold text-[#262626] font-DMsans text-start mb-2">
                    <p className=' text-[13px] text-[#A0A0A0] text-center mb-2'>OTP has been sent on +63525556666355</p>
                    </label>
                    <label>
        <input type="number" className = " w-full h-[7vh] rounded-md bg-[#e7e7e7] focus:outline-none px-3" />
        <div className='flex items-center justify-between font-DMsans text-[15px]'>
          <p >
            Time
          </p>
          <p>Resend OTP</p>
        </div>
      </label>
      {!valid && (
        <p className='text-start text-[12px] text-red-600'>Please enter a valid phone number*</p>
      )}
                  </div>
                  <div className="mb-4 background text-white py-3 rounded-lg font-DMsans">
                  Verify OTP
                    
                  </div>

                
                </form>
              </div>
            </div>
          </div>
        </div>
        
    </>
  );
};

export default OtpPopup;
