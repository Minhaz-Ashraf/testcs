import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep, selectStepper } from "../../Stores/slices/Regslice";
import { Link, useParams } from "react-router-dom";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Form5 from "./Form5";
import Form6 from "./Form6";

const RegistrationFile = () => {
  const formArray = [1, 2, 3, 4, 5, 6];
  // const dispatch = useDispatch();
  const { userData } = useSelector(userDataStore);
  const { currentStep } = useSelector(selectStepper);
  // const [dataCheck, setCheckData] = useState({});

  let { page } = useParams();
  console.log("Page from useParams:", page);
  console.log(userData, "userData");




 

  return (
    <div className="bg-white flex justify-center items-center font-montserrat">
      <div className="md:w-[110vh] w-full rounded-md bg-white p-5">
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <div
                className={`w-[50px] my-3 rounded-full registration mb-8 text-medium ${
                  i <= currentStep - 1
                    ? "text-white background"
                    : "bg-[#FCFCFC] text-black"
                } md:h-[50px] h-[37px] sm:h-[50px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  key={`line-${i}`}
                  className={`w-[50px] h-[2px] registration mb-5 ${
                    i <= currentStep - 2 ? "background" : "bg-[#FCFCFC]"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
     
        {/* Render the correct form based on the 'page' parameter */}
        {page === ("1") && <Form1  page={page} />}
        {page === ("2") && <Form2  page={page} />}
        {page === ("3") && <Form3  page={page} />}
        {page === ("4") && <Form4  page={page} />}
        {page === ("5") && <Form5  page={page} />}
        {page === ("6") && <Form6  page={page} />}
      </div>
    </div>
  );
};

export default RegistrationFile;
