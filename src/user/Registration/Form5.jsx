import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFileUpload, FaUser } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setUser, userDataStore } from "../../Stores/slices/AuthSlice";
import {
  setStep,
  setFormData,
  selectStepper,
} from "../../Stores/slices/Regslice";
import apiurl from "../../util";
import { Link, useNavigate } from "react-router-dom";
import { getLabel, getMasterData } from "../../common/commonFunction.js";
import { FaRegCircleUser } from "react-icons/fa6";
import { selectGender } from "../../Stores/slices/formSlice.jsx";
import { toast } from "react-toastify";
import { AutoComplete, Button, Select } from "antd";
// import ImageCropper from "../../components/ImageCropper.jsx";

const Form5 = () => {
  const dispatch = useDispatch();
  const { currentStep, formData } = useSelector(selectStepper);
  const { userData, userId } = useSelector(userDataStore);
  const gender = useSelector(selectGender);
  const [formFive, setFormFive] = useState({
    aboutYourself: "",
    userPhotos: [],
    userPhotosUrl: [],
    selectedImageIndex: null,
    profileImage: null,
    profilePicture: "",
    profilePictureUrl: "",
    // interests: "",
    fun: [],
    fitness: [],
    other: [],
    interests: [],
  });
  const [interests, setInterests] = useState([]);
  const [fun, setFun] = useState([]);
  const [fitness, setFitness] = useState([]);
  const [others, setOthers] = useState([]);
  const [dataFromServer, setDataFromServer] = useState(false);
  const [latestImages, setLatestImages] = useState([]);
  const [showUrlProfile, setShowUrlProfile] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  // Function to handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Function to handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };
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

  const page = 5;
  const handleinput = (e) => {
    const { name, value, files } = e.target;

    if (name === "userPhotos") {
      // Handle multiple files for userPhotos
      const selectedFiles = Array.from(files);
      setFormFive((prevForm) => ({
        ...prevForm,
        [name]: [...prevForm[name], ...selectedFiles],
        profilePicture: formFive.userPhotos[0],
      }));
    } else {
      // Handle other input fields
      setFormFive((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const onChange = (key, value) => {
    // Ensure the value is an array
    const arrayValue = Array.isArray(value) ? value : [value];

    // Log the array value
    // console.log(`selected ${arrayValue}`);

    // Set the array value in the state
    setFormFive((prevState) => ({
      ...prevState,
      [key]: arrayValue,
    }));
  };

  const onSearch = (value) => {
    // console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [formErrors, setFormErrors] = useState({
    aboutYourself: "",
    profilePicture: "",
    fun: [],
    fitness: [],
    other: [],
    interests: [],
  });
  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formFive.aboutYourself) {
      errors.aboutYourself = "About is required";
      hasErrors = true;
    }
    if (!formFive.profilePicture) {
      errors.profilePicture = "Profile Picture is required";
      hasErrors = true;
    }
    if (!Array.isArray(formFive.interests) || formFive.interests.length === 0) {
      errors.interests = "Interests is required";
      hasErrors = true;
    }
    if (!Array.isArray(formFive.fun) || formFive.fun.length === 0) {
      errors.fun = "Fun activity is required";
      hasErrors = true;
    }
    if (!Array.isArray(formFive.fitness) || formFive.fitness.length === 0) {
      errors.fitness = "Fitness activity is required";
      hasErrors = true;
    }
    if (!Array.isArray(formFive.other) || formFive.other.length === 0) {
      errors.other = "Other activity is required";
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };
  const arrayToString = (arr) => {
    return arr.toString();
  };

  const handleSubmitForm5 = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // console.log(formFive.userPhotos.length);
    if (formFive.userPhotos.length >= 1 && formFive.userPhotos.length <= 5) {
      if (userId) {
        try {
          const formData = new FormData();
          formData.append("userId", userId);
          formData.append("page", page);
          //converting antdesign array fromat to string
          const interestsString = formFive.interests.join(",");

          const funString = formFive.fun.join(",");

          const fitnessString = formFive.fitness.join(",");

          const otherString = formFive.other.join(",");

          let selfDetaillsData = { ...formFive };
          selfDetaillsData.fitness = fitnessString;
          selfDetaillsData.fun = funString;
          selfDetaillsData.other = otherString;
          selfDetaillsData.interests = interestsString;
          formData.append("selfDetails", JSON.stringify(selfDetaillsData));
          formData.append("profileImage", formFive?.profilePicture);
          // console.log(fitnessString, funString, otherString, interestsString);
          formFive.userPhotos.forEach((photo) => {
            formData.append("userPhotos", photo);
          });
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
          toast.success(response.data.message);

          // Handle the response as needed
          // console.log(response.data);
        } catch (err) {
          const errorMessage =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "An unexpected error occurred";
          toast.error(errorMessage);
          // console.error(err);
        }
      }
    } else {
      toast.error("Images Can't be less than 1 and more than 5");
    }
  };

  const handleNext = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    await handleSubmitForm5();
    navigate(`/registration-form/${parseInt(page) + 1}`);
    window.scrollTo(0, 0);
  };
  const customErrorMessages = {
    aboutYourself: "This field is required",
    profilePicture: "This field is required",
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
  const getFormData = async () => {
    if (userId) {
      try {
        const response = await apiurl.get(`/user-data/${userId}?page=5`);
        // console.log(response.data?.pageData.selfDetails);
        if (response.data?.pageData?.selfDetails?.userPhotosUrl.length > 0) {
          setShowUrlProfile(true);
        }
        setFormFive((prevState) => ({
          ...prevState,
          aboutYourself: response.data?.pageData?.selfDetails?.aboutYourself,
          userPhotos: response.data?.pageData?.selfDetails?.userPhotos?.map(
            (item) => item
          ),
          userPhotosUrl:
            response.data?.pageData?.selfDetails?.userPhotosUrl?.map(
              (item) => item
            ),
          profilePicture: response.data?.pageData?.selfDetails?.profilePicture,
          profileImage: response.data?.pageData?.selfDetails?.profilePicture,
          profilePictureUrl:
            response.data?.pageData?.selfDetails?.profilePictureUrl,
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
  //image upload

  // function handleImageChange(e) {

  //   const selectedFiles = e.target.files;
    // console.log(selectedFiles);
  //   const newImages = [];
  //   for (let i = 0; i < Math.min(selectedFiles.length, 5); i++) {
      // console.log("hello");
  //     newImages.push(selectedFiles[i]);
  //   }
    // console.log({ newImages });
  //   setLatestImages((prev) => [...prev, ...newImages]);
    // console.log({ latestImages });

  //   setFormFive({
  //     ...formFive,
  //     userPhotos: [...formFive.userPhotos, ...newImages],
  //   });
    // console.log({ formFive });
  // }

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const currentImagesCount = formFive.userPhotos.length;
    const newImagesCount = selectedFiles.length;

    if (currentImagesCount + newImagesCount < 1) {
      toast.error("You must upload at least 1 images.");
      return;
    }

    if (currentImagesCount + newImagesCount > 5) {
      toast.error("You can upload a maximum of 5 images.");
      return;
    }

    const imagesExceedingSizeLimit = selectedFiles.some(
      (file) => file.size > 5 * 1024 * 1024
    ); // 5MB in bytes

    if (imagesExceedingSizeLimit) {
      toast.error("Each image should be less than 5MB.");
      return;
    }
    const newImages = selectedFiles.slice(
      0,
      Math.min(newImagesCount, 5 - currentImagesCount)
    );

    setLatestImages((prev) => [...prev, ...newImages]);

    setFormFive((prevFormFive) => ({
      ...prevFormFive,
      userPhotos: [...prevFormFive.userPhotos, ...newImages],
    }));
  };

  const handleDeleteUserImage = async (key) => {
    try {
      await apiurl.put(`/user-image-delete/${userId}`, { imageKey: key });
    } catch (err) {
      // console.log(err);
    }
  };
  const handleDeleteImage = (index, arrayType) => {
    // console.log(index);
    if (arrayType === "latestImages") {
      const updatedImages = [...latestImages].filter(
        (image, ind) => ind !== index
      );
      // console.log("imagel", { updatedImages });
      setLatestImages(updatedImages);
      setFormFive((prev) => ({
        ...prev,
        userPhotos: updatedImages, // Update userPhotos state as well
      }));
    } else {
      const updatedImages = [...formFive.userPhotosUrl].filter(
        (image, ind) => ind !== index
      );
      // console.log("imagem", { updatedImages });
      setFormFive((prev) => ({
        ...prev,
        userPhotosUrl: updatedImages,
      }));
      setFormFive((prev) => ({
        ...prev,
        userPhotos: updatedImages,
      }));

      // console.log("User Photos URL State after update:", updatedImages);
    }
  };

  const handleSelectImage = (index) => {
    setFormFive({
      ...formFive,
      selectedImageIndex: index === formFive.selectedImageIndex ? null : index,
    });
  };

  const handleChooseProfileImage = (index, arrayType) => {
    if (arrayType === "latestImages") {
      const selectedImage = latestImages[index];
      if (selectedImage instanceof File) {
        // If selected image is a file, set profilePicture to file name
        setFormFive({
          ...formFive,
          profileImage: selectedImage,
          profilePicture: selectedImage.name, // Update profilePicture with the file name
        });
      } else {
        // If selected image is a URL, set profilePicture to URL
        setFormFive({
          ...formFive,
          profileImage: selectedImage,
          profilePicture: "", // Clear profilePicture to prevent showing file name
        });
      }
      setShowUrlProfile(false);
    } else {
      const selectedImage = formFive.userPhotos[index];
      if (selectedImage.startsWith("http")) {
        // If selected image is a URL, set profilePicture to URL
        setFormFive({
          ...formFive,
          profileImage: selectedImage,
          profilePicture: "", // Clear profilePicture to prevent showing file name
        });
      } else {
        // If selected image is a file name, set profilePicture to file name
        setFormFive({
          ...formFive,
          profileImage: selectedImage,
          profilePictureUrl: formFive.userPhotosUrl[index],
          profilePicture: selectedImage, // Update profilePicture with the file name
        });
      }
      setShowUrlProfile(true);
    }
  };

  const handleDeleteProfileImage = (imageType) => {
    if (imageType === "imageUrl") {
      setFormFive({ ...formFive, profilePictureUrl: null });
    } else {
      setFormFive({ ...formFive, profileImage: null });
    }
  };

  // console.log({ formFive });
  const nextForm = () => {
    // Validate form data and update stepper state
    if (currentStep === 5) {
      dispatch(setStep(currentStep + 1));
    } else if (currentStep === 5) {
      dispatch(setStep(currentStep + 1));
    } else {
      // Handle other cases or show an error message
    }
    window.scrollTo(0, 0);
  };

  const prevForm = () => {
    dispatch(setStep(currentStep - 1));
  };

  useEffect(() => {
    dispatch(setStep(page));
    getInterestData();
    getFunActivityData();
    getOtherData();
    getFitnessData();
  }, []);
  useEffect(() => {
    getFormData();
  }, [userId]);

  // console.log({ formFive });

  const handleSelectAll = (key, dataSource, dataKey) => {
    const allValues = dataSource.map((item) => item[dataKey]);
    // console.log(allValues);
    setFormFive((prevState) => ({
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
              setFormFive((prevState) => ({
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

  return (
    <>
      <div className="bg-[#FCFCFC] sm:mx-12 md:mx-0 md:px-9 sm:px-6 px-5 py-12 rounded-xl shadow ">
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="font-semibold mb-1">
            {getLabel()} About <span className="text-primary">*</span>
          </label>
          <textarea
            value={formFive?.aboutYourself}
            onChange={(e) => handleinput(e)}
            className="p-2  bg-[#F0F0F0] mt-1 outline-0 h-[30vh] border focus:border-[#CC2E2E]  rounded-md mb-3"
            type="text"
            name="aboutYourself"
            placeholder="Write about yourself...."
            id="about"
          />

          <label htmlFor="name" className="font-semibold mt-2 mb-9  ">
            {getLabel()} Photos <span className="text-primary">*</span>
          </label>
          <div className="    ">
            <label
              htmlFor="images"
              className="drop-container flex justify-center items-center border border-[#CC2E2E]  "
              id="dropcontainer"
            >
              <span className="drop-title">Upload a Photo</span>
              <span className="flex items-center justify-center  ">
                <FaFileUpload color="#CC2E2E" size={50} />
              </span>
              <input
                type="file"
                id="images"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                required
              />
            </label>
            {/*   // onClick={() =>
                // {
                //   if (dataFromServer === true)
                //   {
                //     formFive.profilePicture = "";
                //     formFive.userPhotos = [];
                //     setDataFromServer(false);
                //   }
                // }} */}
          </div>
          <div className="flex flex-wrap gap-5 mt-9 ]">
            {/* {console.log(latestImages)} */}
            {latestImages.length > 0 && (
              <div>
                <p className="mb-3 font-medium font-DMsans">
                  Select one image as profile:
                </p>
                <div className="flex flex-wrap gap-3">
                  {latestImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                        className="w-[9rem] h-[20vh] rounded-xl border-[2px] border-primary "
                        style={{
                          border:
                            index === formFive.selectedImageIndex
                              ? "2px solid #CC2E2E"
                              : "none",
                        }}
                        onClick={() => handleSelectImage(index)}
                      />
                      <div className="flex gap-3 mt-2 mb-3">
                        <button
                          onClick={() => {
                            handleDeleteImage(index, "latestImages");
                          }}
                          className="px-6 text-[20px] py-1 border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                        >
                          {" "}
                          <RiDeleteBin6Line />
                        </button>
                        <button
                          onClick={() =>
                            handleChooseProfileImage(index, "latestImages")
                          }
                          className="px-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                        >
                          <FaRegCircleUser />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {formFive.profileImage != null && !showUrlProfile && (
              <div>
                <p className="mb-3 font-medium font-DMsans"> Profile Image:</p>
                <img
                  src={URL.createObjectURL(formFive.profileImage)}
                  alt="Profile"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <button
                  onClick={() => handleDeleteProfileImage("profileImage")}
                  className="px-6 text-[20px] mt-3 py-1 border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                >
                  {/* <ImageCropper imageURL={URL.createObjectURL(formFive.profileImage)} /> */}{" "}
                  <RiDeleteBin6Line />
                </button>
              </div>
            )}
          </div>
          <div className=" gap-5 mt-20 ">
            {formFive?.userPhotosUrl?.length > 0 && (
              <div>
                <p className=" font-DMsans font-medium">Your Uploaded Images</p>
                <div className="flex flex-wrap gap-5 mt-3">
                  {formFive?.userPhotosUrl?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-[22vh] h-[22vh] rounded-xl border-[2px] border-primary "
                        style={{
                          border:
                            index === formFive.selectedImageIndex
                              ? "2px solid #CC2E2E"
                              : "none",
                        }}
                        onClick={() => handleSelectImage(index)}
                      />
                      <div className="flex gap-2 items-center mt-2">
                        <button
                          onClick={() => {
                            handleDeleteUserImage(formFive.userPhotos[index]);
                            handleDeleteImage(index, "userPhotosUrl");
                          }}
                          className="px-6   text-[20px] py-1 border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                        >
                          {" "}
                          <RiDeleteBin6Line />
                        </button>
                        <button
                          onClick={() =>
                            handleChooseProfileImage(index, "userPhotosUrl")
                          }
                          className="px-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                        >
                          <FaRegCircleUser />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {formFive?.profilePictureUrl && showUrlProfile && (
              <div>
                <p className=" font-DMsans font-medium mt-5 mb-2">
                  Profile Image:
                </p>
                <img
                  src={formFive.profilePictureUrl}
                  alt="Profile"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <button
                  onClick={() => handleDeleteProfileImage("imageUrl")}
                  className="px-6 text-[20px] py-1 mt-2  border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary"
                >
                  {" "}
                  <RiDeleteBin6Line />
                  {/* <ImageCropper imageURL={URL.createObjectURL(formFive.profileImage)} /> */}
                </button>
              </div>
            )}
          </div>

          <p className=" text-[13px]">
            Add a minimum of 1 or a maximum of 5 high-quality images. Select 1
            image as your thumbnail image. Your thumbnail image will be visible
            to everyone. Once you permit other profiles, then you entire profile
            will get unlocked & visible to the other members
          </p>
        </div>
        <div className=" mb-2 mt-9">
          <label className="font-semibold    ">
            {" "}
            {getLabel()} Interests <span className="text-primary">*</span>
          </label>
          <div className="mt-3">
            <Select
              name="interest"
              showSearch
              value={formFive.interests}
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
            {/* 
              <select
              name="interests"
              onChange={(e) => handleinput(e)}
              className="p-2 w-full bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] border focus:border-[#CC2E2E] rounded-md"
              id=""
              value={formFive.interests}
            >
              <option value="">Select</option>
              {interests.map((activity) => (
                <option
                  key={activity.InterestId}
                  value={activity.InterestId}
                >
                  {activity.InterestName}
                </option>
              ))}
            </select> */}

            {/* <AutoComplete
              options={interests.map((interest) => ({
                value: interest.InterestName,
              }))}
              value={formFive.interests}
              onChange={(value) => handleAutoInput("interests", value)}
              placeholder="Select Interests"
              className="w-full h-12 font-DMsans "
              
            /> */}
          </div>
        </div>
        <div className=" mb-2 mt-5">
          <label className="font-semibold    ">
            {" "}
            {getLabel()} Fun Activities <span className="text-primary">*</span>
          </label>

          <div className="mt-3">
            {/* <select
              name="fun"
              onChange={(e) => handleinput(e)}
              className="p-2 w-full bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] border focus:border-[#CC2E2E] rounded-md"
              id=""
              value={formFive.fun}
            >
              <option value="">Select</option>
              {fun.map((activity) => (
                <option
                  key={activity.FunActivityId}
                  value={activity.FunActivityId}
                >
                  {activity.FunActivityName}
                </option>
              ))}
            </select> */}

            {/* <AutoComplete
              options={fun.map((fun) => ({ value: fun.FunActivityName }))}
              value={formFive.fun}
              onChange={(value) => handleAutoInput("fun", value)}
              placeholder="Select Fun"
              className="w-full h-12 font-DMsans "
            /> */}
            <Select
              name="fun"
              showSearch
              value={formFive.fun}
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
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 mb-9">
            {" "}
            {getLabel()} Fitness <span className="text-primary">*</span>
          </label>
          <div className="mt-3">
            {" "}
            {/* <select
              name="fitness"
              onChange={(e) => handleinput(e)}
              className="p-2 w-full bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] border focus:border-[#CC2E2E] rounded-md"
              id=""
              value={formFive.fitness}
            >
              <option value="">Select</option>
              {fitness.map((activity) => (
                <option key={activity.FitnessId} value={activity.FitnessId}>
                  {activity.FitnessName}
                </option>
              ))}
            </select> */}
            {/* <AutoComplete
              options={fitness.map((fit) => ({ value: fit.FitnessName }))}
              value={formFive.fitness}
              onChange={(value) => handleAutoInput("fitness", value)}
              placeholder="Select Fitness"
              className="w-full h-12 font-DMsans  "
            /> */}
            <Select
              name="interest"
              showSearch
              value={formFive.fitness}
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
          </div>
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 mb-9">
            {" "}
            {getLabel()} Other Interests <span className="text-primary">*</span>
          </label>
          <div className="mt-3">
            {/* <select
              name="other"
              onChange={(e) => handleinput(e)}
              className="p-2  w-full bg-[#F0F0F0] mt-1 outline-0 md:h-[8vh] border focus:border-[#CC2E2E] rounded-md"
              id=""
              value={formFive.other}
            >
              <option value="">Select </option>
              {others.map((other) => (
                <option key={other.OtherId} value={other.OtherId}>
                  {other.OtherName}
                </option>
              ))}
            </select> */}

            {/* <AutoComplete
              options={others.map((other) => ({ value: other.OtherName }))}
              value={formFive.other}
              onChange={handleInputO}
              placeholder="Select Other Interests"
              className="w-full h-12 font-DMsans "
            /> */}
            <Select
              name="other"
              showSearch
              value={formFive.other}
              placeholder="Other"
              optionFilterProp="children"
              onChange={(value) => onChange("other", value)}
              onSearch={onSearch}
              filterOption={filterOption}
              mode="multiple"
              // dropdownRender={dropdownRender("other", others, "OtherId")}
              options={others.map((other) => ({
                value: other.OtherId,
                label: other.OtherName,
              }))}
              className="w-full "
            />
          </div>
        </div>

        <span className="mt-9 flex justify-center  items-center md:gap-16 gap-3 px-12">
          <Link
            to={`/registration-form/${parseInt(page) - 1}`}
            onClick={prevForm}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Previous
          </Link>

          <Link
            onClick={handleSubmitForm5}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Save
          </Link>
          <Link
            onClick={handleNext}
            className="px-3 py-2 text-lg rounded-md w-full text-white text-center background"
          >
            Next
          </Link>
        </span>
      </div>
    </>
  );
};

export default Form5;
