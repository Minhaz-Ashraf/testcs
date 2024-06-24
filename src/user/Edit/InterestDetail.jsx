import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import apiurl from "../../util";
import { Link } from "react-router-dom";
import { getMasterData } from "../../common/commonFunction";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Select } from "antd";
const InterestDetail = ({
  showProfile,
  profileData,
  setAgainCallFlag,
  againCallFlag,
}) => {
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
console.log(Interestdet);
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
console.log(interests, "huh");
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
    const allSelected = arrayValue.length === fun.length;

    setInterestDet((prevState) => ({
      ...prevState,
      [key]: allSelected ? "openToAll" : arrayValue,
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

  const handleSubmitForm5 = async () => {
    try {
      const formData = new FormData();

      formData.append("page", page);
      //converting antdesign array fromat to string
      const interestsString = Array.isArray(Interestdet?.interests)
        ? Interestdet.interests.join(",")
        : "";
      const funString = Array.isArray(Interestdet?.fun)
        ? Interestdet.fun.join(",")
        : "";
      const fitnessString = Array.isArray(Interestdet?.fitness)
        ? Interestdet.fitness.join(",")
        : "";
      const otherString = Array.isArray(Interestdet?.other)
        ? Interestdet.other.join(",")
        : "";

      let selfDetaillsData = { ...Interestdet };
      selfDetaillsData.fitness = fitnessString;
      selfDetaillsData.fun = funString;
      selfDetaillsData.other = otherString;
      selfDetaillsData.interests = interestsString;
      formData.append("selfDetails", JSON.stringify(selfDetaillsData));

      // console.log(fitnessString, funString, otherString, interestsString);

      // console.log({ formData });
      const response = await apiurl.post(
        `/user-data/${userId}?page=5&type=edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsOpen((prev) => !prev);
      setAgainCallFlag(true);
      toast.success(response.data.message);

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
      [key]: allValues ? "" : arrayValue,
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
            style={{ color: " #A92525" }}
          >
            Open to All
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
            style={{ color: " #A92525" }}
          >
            Clear All
          </Button>
        </div>
        {menu}
      </div>
    );

  const getFormData = async () => {
    if (userId) {
      try {
        const response = await apiurl.get(`/user-data/${userId}?page=5`);
        // console.log(response.data?.pageData.selfDetails);
        console.log(response.data?.pageData?.selfDetails);
        setInterestDet((prevState) => ({
          ...prevState,
            
          interests:  response.data?.pageData?.selfDetails?.interests !== "" ? response.data?.pageData?.selfDetails?.interests?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
       
          
          fun: response.data?.pageData?.selfDetails?.fun !== "" ? response.data?.pageData?.selfDetails?.fun?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
          fitness: response.data?.pageData?.selfDetails?.fitness !== "" ? response.data?.pageData?.selfDetails?.fitness?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
          other: response.data?.pageData?.selfDetails?.other !== "" ? response.data?.pageData?.selfDetails?.other?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
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
  
      const parseStringToArray = (str) => {
        if (!str) return [];
        return str
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "" && !isNaN(item))
          .map((item) => parseInt(item, 10));
      };
  
      // Convert arrays containing only NaN to ["openToAll"]
      const handleNaNValues = (arr) => {
        if (arr.length === 0) return [];
        const containsNaN = arr.some(item => isNaN(item));
        return containsNaN ? ["openToAll"] : arr;
      };
  
      setInterestDet({
        fun: handleNaNValues(Array.isArray(data?.fun) ? data.fun : parseStringToArray(data?.fun)),
        other: handleNaNValues(Array.isArray(data?.other) ? data.other : parseStringToArray(data?.other)),
        fitness: handleNaNValues(Array.isArray(data?.fitness) ? data.fitness : parseStringToArray(data?.fitness)),
        interests: handleNaNValues(Array.isArray(data?.interests) ? data.interests : parseStringToArray(data?.interests)),
      });
    }
  
    setInterestDatas(userData);
  };
  
  useEffect(() => {
    fetchData();
    console.log("interestDetails");
  }, [againCallFlag]);

  return (
    <>
      <div className="shadow rounded-xl    py-3 mt-9 my-5  md:mb-0 mb-36 sm:mb-0  w-full overflow-hidden">
        <span className="flex justify-between items-center text-primary px-10 pe-5 py-2">
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
        <span className="flex md:flex-row sm:flex-row flex-col  items-baseline justify-between font-DMsans  px-10 text-start pb-8">
          <span className=" mt-4  text-[17px] md:w-1/2 sm:w-1/2">
            <p className="  font-medium"> Interests</p>
            <p className=" font-light text-[15px] md:pe-36">
              {!interestDatas?.interestsTypes && !interestDatas?.interestsTypes
                ? "Open To All"
                : interestDatas?.interestsTypes}
            </p>
            <p className=" pt-4 font-medium">Fun</p>
            <p className=" font-light text-[15px] md:pe-40">
              {!interestDatas?.funActivitiesTypes &&
              !interestDatas?.funActivitiesTypes
                ? "Open To All"
                : interestDatas?.funActivitiesTypes}
            </p>
          </span>
          <span className="text-[17px] mt-5 md:w-1/2 sm:w-1/2">
            <p className="  font-medium">Fitness</p>
            <p className=" font-light text-[15px]">
              {!interestDatas?.fitnessTypes && !interestDatas?.fitnessTypes
                ? "Open To All"
                : interestDatas?.fitnessTypes}
            </p>
            <p className=" pt-4 font-medium">Other Interests</p>
            <p className=" font-light text-[15px]">
            {!interestDatas?.otherTypes && !interestDatas?.otherTypes
                ? "Open To All"
                : interestDatas?.otherTypes}
            </p>
          </span>
        </span>

        {isOpen && (
          <>
            <span className="flex md:flex-row sm:flex-col flex-col  items-baseline justify-between sm:gap-3  font-DMsans px-10 text-start pb-8 pt-5">
              <span className="w-1/2 pe-20">
                <label className="font-semibold  pt-5  ">Interests</label>
                <Select
                  name="interest"
                  showSearch
                  value={
                    Interestdet.interests === "" 
                      ? ["Open to all"]
                      : Interestdet.interests
                  }
                  placeholder="Interests"
                  optionFilterProp="children"
                  onChange={(value) => onChange("interests", value)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  mode="multiple"
                  dropdownRender={dropdownRender(
                    "interests",
                    interests,
                    "InterestId"
                  )}
                  options={interests.map((interest) => ({
                    value: interest.InterestId,
                    label: interest.InterestName,
                  }))}
                  className="w-full custom-select font-DMsans"
                />
                <div className=" mb-2 mt-5">
                  <label className="font-semibold  pt-5  ">
                    Fun Activities
                  </label>
                  <Select
                    name="fun"
                    showSearch
                    value={
                      Interestdet.fun === "" ? ["Open to all"] : Interestdet.fun
                    }
                    placeholder="Fun Activities"
                    optionFilterProp="children"
                    onChange={(value) => onChange("fun", value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    mode="multiple"
                    dropdownRender={dropdownRender("fun", fun, "FunActivityId")}
                    options={fun.map((fun) => ({
                      value: fun.FunActivityId,
                      label: fun.FunActivityName,
                    }))}
                    className="w-full custom-select font-DMsans"
                  />
                </div>
              </span>

              <span className="w-1/2 pe-20">
                <label className="font-semibold mt-2 mb-9  ">Fitness</label>

                <Select
                  name="interest"
                  showSearch
                  value={
                    Interestdet.fitness === "" 
                      ? ["Open to all"]
                      : Interestdet.fitness
                  }
                  placeholder="Fitness"
                  optionFilterProp="children"
                  onChange={(value) => onChange("fitness", value)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  mode="multiple"
                  dropdownRender={dropdownRender(
                    "fitness",
                    fitness,
                    "FitnessId"
                  )}
                  options={fitness.map((fit) => ({
                    value: fit.FitnessId,
                    label: fit.FitnessName,
                  }))}
                  className="w-full custom-select font-DMsans "
                />

                <div className=" mb-2 mt-5">
                  <label className="font-semibold mt-2 mb-9  ">
                    {" "}
                    Other interestss
                  </label>
                  <Select
                    name="other"
                    showSearch
                    value={
                      Interestdet.other === ""
                        ? ["Open to all"]
                        : Interestdet.other
                    }
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
                    className="w-full custom-select font-DMsans "
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
