import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import apiurl from "../../util";
import { Link } from "react-router-dom";
import { getMasterData } from "../../common/commonFunction";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Select } from "antd";
const InterestDetail = ({ showProfile, profileData }) => {
  const { userData, userId } = useSelector(userDataStore);
  const [isOpen, setIsOpen] = useState(false);
  const [interestDatas, setInterestDatas] = useState([]);
  const page = 5;
  const [Interestdet, setInterestDet] = useState({
    fun: [],
    fitness: [],
    other: [],
    interests: [],
  });

  // const handleinput = (e) =>
  // {
  //   const { name, value, files } = e.target;

  //   if (name === "userPhotos")
  //   {
  //     // Handle multiple files for userPhotos
  //     const selectedFiles = Array.from(files);
  //     setInterestDet((prevForm) => ({
  //       ...prevForm,
  //       [name]: [...prevForm[name], ...selectedFiles],
  //       profilePicture: Interestdet.userPhotos[0],
  //     }));
  //   } else
  //   {
  //     // Handle other input fields
  //     setInterestDet((prevForm) => ({
  //       ...prevForm,
  //       [name]: value,
  //     }));
  //   }
  // };
  const [interests, setInterests] = useState([]);
  const [fun, setFun] = useState([]);
  const [fitness, setFitness] = useState([]);
  const [others, setOthers] = useState([]);

  const getInterestData = async () => {
    const data = await getMasterData("interest");
    setInterests(
      data.map((item) => ({
        InterestId: item.intrest_id,
        InterestName: item.intrest_name,
      }))
    );
  };

  const getFunActivityData = async () => {
    const data = await getMasterData("funActivity");
    setFun(
      data.map((item) => ({
        FunActivityId: item.funActivity_id,
        FunActivityName: item.funActivity_name,
      }))
    );
  };

  const getOtherData = async () => {
    const data = await getMasterData("other");
    setOthers(
      data.map((item) => ({
        OtherId: item.other_id,
        OtherName: item.other_name,
      }))
    );
  };

  const getFitnessData = async () => {
    const data = await getMasterData("fitness");
    setFitness(
      data.map((item) => ({
        FitnessId: item.fitness_id,
        FitnessName: item.fitness_name,
      }))
    );
  };

  const onChange = (key, value) => {
    // Ensure the value is an array
    const arrayValue = Array.isArray(value) ? value : [value];

    // Log the array value
    // console.log(`selected ${arrayValue}`);

    // Set the array value in the state
    setInterestDet((prevState) => ({
      ...prevState,
      [key]: arrayValue,
    }));
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [formErrors, setFormErrors] = useState({
    fun: [],
    fitness: [],
    other: [],
    interests: [],
  });
  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (
      !Array.isArray(Interestdet.interests) ||
      Interestdet.interests.length === 0
    ) {
      errors.interests = "Interests is required";
      hasErrors = true;
    }
    if (!Array.isArray(Interestdet.fun) || Interestdet.fun.length === 0) {
      errors.fun = "Fun activity is required";
      hasErrors = true;
    }
    if (
      !Array.isArray(Interestdet.fitness) ||
      Interestdet.fitness.length === 0
    ) {
      errors.fitness = "Fitness activity is required";
      hasErrors = true;
    }
    if (!Array.isArray(Interestdet.other) || Interestdet.other.length === 0) {
      errors.other = "Other activity is required";
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };
  // const arrayToString = (arr) => {
  //   return arr.toString();
  // };

  const handleSubmitForm5 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      setIsOpen((prev) => prev);
      return;
    }

    // console.log(Interestdet.userPhotos.length);

    try {
      const formData = new FormData();

      formData.append("page", page);
      //converting antdesign array fromat to string
      const interestsString = Interestdet.interests.join(",");

      const funString = Interestdet.fun.join(",");

      const fitnessString = Interestdet.fitness.join(",");

      const otherString = Interestdet.other.join(",");

      let selfDetaillsData = { ...Interestdet };
      selfDetaillsData.fitness = fitnessString;
      selfDetaillsData.fun = funString;
      selfDetaillsData.other = otherString;
      selfDetaillsData.interests = interestsString;
      formData.append("selfDetails", JSON.stringify(selfDetaillsData));

      // console.log(fitnessString, funString, otherString, interestsString);

      // console.log({ formData });
      const response = await apiurl.post(
        `/user-data/${userId}?page=5`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsOpen((prev) => !prev);
      toast.success(response.data.message);
      fetchData();
      // Handle the response as needed
      // console.log(response.data);
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "An unexpected error occurred";

      toast.error(errorMessage);
      // console.error(err);
    }
  };

  // const handleNext = async () => {
  //   if (!validateForm()) {
  //     toast.error("Please fill in all required fields.");
  //     return;
  //   }
  //   await handleSubmitForm5();
  //   navigate(`/registration-form/${parseInt(page) + 1}`);
  //   window.scrollTo(0, 0);
  // };
  const customErrorMessages = {
    fun: "This field is required",
    fitness: "This field is required",
    other: "This field is required",
    interests: "This field is required",
  };

  const handleBlurError = (e) => {
    const { value, name } = e.target;
    const errors = { ...formErrors };

    // Validate the input field when it loses focus
    if (!value.trim()) {
      errors[name] = `${customErrorMessages[name]} is required !`;
    } else {
      errors[name] = ""; // Clear the error message if the field is not empty
    }

    setFormErrors(errors);
  };
  // const getFormData = async () => {
  //   if (userId) {
  //     try {
  //       const response = await apiurl.get(`/user-data/${userId}?page=5`);
  //       // console.log(response.data?.pageData.selfDetails);
  //       if (response.data?.pageData?.selfDetails?.userPhotosUrl.length > 0) {
  //         setShowUrlProfile(true);
  //       }
  //       setInterestDet((prevState) => ({
  //         ...prevState,

  //         interests: response.data?.pageData?.selfDetails?.interests
  //           ?.split(",")
  //           .map((item) => parseInt(item.trim())),
  //         fun: response.data?.pageData?.selfDetails?.fun
  //           ?.split(",")
  //           ?.map((item) => parseInt(item.trim())),
  //         fitness: response.data?.pageData?.selfDetails?.fitness
  //           ?.split(",")
  //           .map((item) => parseInt(item.trim())),
  //         other: response.data?.pageData?.selfDetails?.other
  //           ?.split(",")
  //           .map((item) => parseInt(item.trim())),
  //       }));
  //     } catch (err) {
  //       // console.log(err);
  //     }
  //   }
  // };
  const onSearch = (value) => {
    // console.log("search:", value);
  };
  useEffect(() => {
    getInterestData();
    getFunActivityData();
    getOtherData();
    getFitnessData();
  }, []);
  useEffect(() => {
    getFormData();
    if (showProfile) {
      setIsOpen(false);
    }
  }, [userId, showProfile]);

  // console.log({ Interestdet });

  const handleSelectAll = (key, dataSource, dataKey) => {
    const allValues = dataSource.map((item) => item[dataKey]);
    // console.log(allValues);
    setInterestDet((prevState) => ({
      ...prevState,
      [key]: allValues,
    }));
  };
  const dropdownRender = (key, dataSource, dataKey) => (menu) =>
    (
      <div>
        <div
          style={{
            padding: "4px 8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="link"
            size="small"
            onClick={() => handleSelectAll(key, dataSource, dataKey)}
          >
            Select All
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              // Clear all selections by setting an empty string
              setInterestDet((prevState) => ({
                ...prevState,
                [key]: [],
              }));
            }}
          >
            Clear All
          </Button>
        </div>
        {menu}
      </div>
    );

  // const getFormData = async () =>
  // {
  //   if (selfDetails)
  //   {

  //     setDataFromServer(true);
  //     // setInterestDet((prevState) => ({
  //     //   ...prevState,
  //     //   aboutYourself: selfDetails?.aboutYourself,
  //     //   interests: selfDetails?.interests,
  //     //   fun: selfDetails?.fun,
  //     //   fitness: selfDetails?.fitness,
  //     //   other: selfDetails?.other,
  //     //   funActivitiesTypes: selfDetails?.funActivitiesTypes,
  //     //   fitnessTypes: selfDetails?.fitnessTypes,
  //     //   interestsTypes: selfDetails?.interestsTypes,
  //     //   otherTypes: selfDetails?.otherTypes
  //     // }));
  //     getInterestData();
  //     getFunActivityData();
  //     getOtherData();
  //     getFitnessData();
  //   }
  // };

  // useEffect(() =>
  // {
  //   getFormData();
  // }, [])

  // console.log(userData.familyDetails);

  const getFormData = async () => {
    if (userId) {
      try {
        const response = await apiurl.get(`/user-data/${userId}?page=5`);
        // console.log(response.data?.pageData.selfDetails);

        setInterestDet((prevState) => ({
          ...prevState,

          interests: response.data?.pageData?.selfDetails?.interests
            ?.split(",")
            .map((item) => parseInt(item.trim())),
          fun: response.data?.pageData?.selfDetails?.fun
            ?.split(",")
            ?.map((item) => parseInt(item.trim())),
          fitness: response.data?.pageData?.selfDetails?.fitness
            ?.split(",")
            .map((item) => parseInt(item.trim())),
          other: response.data?.pageData?.selfDetails?.other
            ?.split(",")
            .map((item) => parseInt(item.trim())),
        }));
      } catch (err) {
        // console.log(err);
      }
    }
  };

  const fetchData = () => {
    const userData = profileData[4];
    if (userData) {
      const data = profileData[4];
      setInterestDet({
        fun: data?.fun?.split(",").map((item) => parseInt(item.trim())),
        other: data?.other?.split(",").map((item) => parseInt(item.trim())),
        fitness: data?.fitness?.split(",").map((item) => parseInt(item.trim())),
        interests: data?.interests?.split(",").map((item) => parseInt(item.trim())),
      });
    }

    setInterestDatas(userData);
  };
  useEffect(() => {
    fetchData();
  }, [profileData]);

  return (
    <>
      <div className="shadow rounded-xl    py-3 mt-9 my-5  md:mb-0 mb-36 sm:mb-0  w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 py-2">
          <p className="  font-medium  text-[20px]">
            Additional Details & Interests
          </p>
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[20px] cursor-pointer flex items-center font-DMsans"
          >
            {!showProfile && (
              <>
                {" "}
                {!isOpen ? (
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
        <hr className="mx-9" />
        <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between font-DMsans md:pe-64 pe-9 px-10 text-start pb-8">
          <span className=" mt-4  text-[14px]">
            <p className="  font-medium"> Interests</p>
            <p className=" font-light md:pe-36">
              {interestDatas?.interestsTypes || "NA"}
            </p>
            <p className=" pt-4 font-medium">Fun</p>
            <p className=" font-light md:pe-40">
              {interestDatas?.funActivitiesTypes || "NA"}
            </p>
          </span>
          <span className="text-[14px] mt-5">
            <p className="  font-medium">Fitness</p>
            <p className=" font-light ">
              {interestDatas?.fitnessTypes || "NA"}
            </p>
            <p className=" pt-4 font-medium">Other Interests</p>
            <p className=" font-light ">{interestDatas?.otherTypes || "NA"}</p>
          </span>
        </span>

        {isOpen && (
          <>
            <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between md:gap-36 sm:gap-36  font-DMsans px-10 text-start pb-8 pt-5">
              <span className="w-full">
                <label className="font-semibold  pt-5  ">Interests</label>
                <Select
                  name="interest"
                  showSearch
                  value={Interestdet.interests}
                  placeholder="Interests"
                  optionFilterProp="children"
                  onChange={(value) => onChange("interests", value)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  mode="multiple"
                  // dropdownRender={dropdownRender(
                  //   "interests",
                  //   interests,
                  //   "InterestId"
                  // )}
                  options={interests.map((interest) => ({
                    value: interest.InterestId,
                    label: interest.InterestName,
                  }))}
                  className="w-full "
                />
                <div className=" mb-2 mt-5">
                  <label className="font-semibold  pt-5  ">
                    Fun Activities
                  </label>
                  <Select
                    name="fun"
                    showSearch
                    value={Interestdet.fun}
                    placeholder="Fun Activities"
                    optionFilterProp="children"
                    onChange={(value) => onChange("fun", value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    mode="multiple"
                    // dropdownRender={dropdownRender("fun", fun, "FunActivityId")}
                    options={fun.map((fun) => ({
                      value: fun.FunActivityId,
                      label: fun.FunActivityName,
                    }))}
                    className="w-full "
                  />
                </div>
              </span>

              <span className="w-full">
                <label className="font-semibold mt-2 mb-9  ">Fitness</label>

                <Select
                  name="interest"
                  showSearch
                  value={Interestdet.fitness}
                  placeholder="Fitness"
                  optionFilterProp="children"
                  onChange={(value) => onChange("fitness", value)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  mode="multiple"
                  // dropdownRender={dropdownRender("fitness", fitness, "FitnessId")}
                  options={fitness.map((fit) => ({
                    value: fit.FitnessId,
                    label: fit.FitnessName,
                  }))}
                  className="w-full "
                />

                <div className=" mb-2 mt-5">
                  <label className="font-semibold mt-2 mb-9  ">
                    {" "}
                    Other interestss
                  </label>
                  <Select
                    name="other"
                    showSearch
                    value={Interestdet.other}
                    placeholder="Other"
                    optionFilterProp="children"
                    onChange={(value) => onChange("other", value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    mode="multiple"
                    dropdownRender={dropdownRender("other", others, "OtherId")}
                    options={others.map((other) => ({
                      value: other.OtherId,
                      label: other.OtherName,
                    }))}
                    className="w-full "
                  />
                </div>
              </span>
            </span>

            <div className="flex items-center justify-end gap-5  mx-9 md:mb-9 sm:mb-10   font-DMsans">
              <span
                onClick={() => setIsOpen((prev) => !prev)}
                className="border border-primary text-primary px-5 rounded-md py-2 cursor-pointer"
              >
                Cancel
              </span>
              <span
                onClick={() => {
                  handleSubmitForm5();
                 
                }}
                className="bg-primary text-white px-7 rounded-md py-2 cursor-pointer"
              >
                Save
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default InterestDetail;
