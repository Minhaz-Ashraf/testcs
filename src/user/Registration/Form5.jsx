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
import { setUserAddedbyAdminId } from "../../Stores/slices/Admin.jsx";
// import ImageCropper from "../../components/ImageCropper.jsx";

const Form5 = () => {
  const dispatch = useDispatch();
  const { currentStep, formData } = useSelector(selectStepper);
  const { admin } = useSelector((state) => state.admin);

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
  const [profilePictureIndex, setProfilePictureIndex] = useState(-1);

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
    const allSelected = arrayValue.length === fun.length;

    setFormFive((prevState) => ({
      ...prevState,
      [key]: allSelected ? "openToAll" : arrayValue,
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
          const interestsString = Array.isArray(formFive?.interests)
          ? formFive.interests.join(",")
          : "";
        const funString = Array.isArray(formFive?.fun)
          ? formFive.fun.join(",")
          : "";
        const fitnessString = Array.isArray(formFive?.fitness)
          ? formFive.fitness.join(",")
          : "";
        const otherString = Array.isArray(formFive?.other)
          ? formFive.other.join(",")
          : "";

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
          if(admin === "new"){
            dispatch(setUser({ userData: { ...response.data.user } }));
          }else if( admin === "adminAction" ){
            dispatch(setUserAddedbyAdminId({ userAddedbyAdminId: { ...response?.data?.user?._id } }));
          }
          // Handle the response as needed
          // console.log(response.data);
        } catch (err) {
          const errorMessage =
            err.response && err.response.data && err.response.data.message
              ? err.response.data.message
              : "An unexpected error occurred";
          toast.error(errorMessage);
          console.error(err);
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
        const formData = response.data?.pageData;
        
        // Check and set profile picture index
        const profilePictureIndexInUserPhotos = formData.selfDetails.userPhotosUrl.findIndex(
          (url) => url === formData.selfDetails.profilePictureUrl
        );
  
        if (profilePictureIndexInUserPhotos !== -1) {
          setProfilePictureIndex(profilePictureIndexInUserPhotos);
        } else {
          // Check if profilePicture matches any of the latestImages
          const profilePictureIndexInLatestImages = latestImages.findIndex(
            (image) =>
              URL.createObjectURL(image) === formData.selfDetails.profilePictureUrl
          );
          if (profilePictureIndexInLatestImages !== -1) {
            setProfilePictureIndex(profilePictureIndexInLatestImages);
          }
        }
  
        // Update showUrlProfile based on profile picture URL
        if (formData.selfDetails.profilePictureUrl) {
          setShowUrlProfile(true);
        }
  
        // Update state with fetched data
        setFormFive((prevState) => ({
          ...prevState,
          aboutYourself: formData.selfDetails?.aboutYourself,
          userPhotos: formData.selfDetails?.userPhotos?.map(item => item),
          userPhotosUrl: formData.selfDetails?.userPhotosUrl?.map(item => item),
          profilePicture: formData.selfDetails?.profilePicture,
          profileImage: formData.selfDetails?.profilePicture,
          profilePictureUrl: formData.selfDetails?.profilePictureUrl,
          interests: formData.selfDetails?.interests !== "" ? formData?.selfDetails?.interests?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
          fun: formData.selfDetails?.fun !== "" ? formData?.selfDetails?.fun?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
          fitness: formData.selfDetails?.fitness !== "" ? formData?.selfDetails?.fitness?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
          other: formData.selfDetails?.other !== "" ? formData?.selfDetails?.other?.split(",")
          ?.map((item) => parseInt(item.trim())) : "",
        }));
  
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    }
  };
  

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
    setProfilePictureIndex(index);
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
              setFormFive((prevState) => ({
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
          <div className=" w-60  ">
            <label
              htmlFor="images"
              className="drop-container items-center border border-[#CC2E2E]  "
              id="dropcontainer"
            >
              <span className="drop-title">Upload a Photo</span>
              <span className="flex items-center justify-start">
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
           
          </div>
          <div className="flex flex-wrap gap-5 mt-9">
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
                        className={`w-[9rem] h-[20vh] rounded-xl 
               ${
                    profilePictureIndex === index
                      ? "border-2 border-primary"
                      : ""
                  }`}
                  loading="lazy"
                      
                        // onClick={() => handleSelectImage(index)}
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
                          className={`p-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary ${
                      profilePictureIndex === index
                        ? "bg-primary text-white"
                        : ""
                    }`}
              
                        >
                          <FaRegCircleUser />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
      
          </div>
          <div className=" gap-5  ">
            {formFive?.userPhotosUrl?.length > 0 && (
              <div>
                <p className=" font-DMsans font-medium">Your Uploaded Images</p>
                <div className="flex flex-wrap gap-5 mt-3">
                  {formFive?.userPhotosUrl?.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className={`w-[22vh] h-[22vh] rounded-xl  ${
                    profilePictureIndex === index
                      ? "border-2 border-primary p-1"
                      : ""
                  }`}
                        
                        // onClick={() => handleSelectImage(index)}
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
                          className={`px-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary ${
                      profilePictureIndex === index
                        ? "bg-primary text-white"
                        : ""
                    }`}
      
                        >
                          <FaRegCircleUser />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
       
          </div>

          <p className=" text-[13px] pt-6">
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
              value={
                      formFive.interests === ""
                        ? ["Open to all"]
                        : formFive.interests
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
              className="w-full custom-select  font-DMsans text-[15px]"
            />
            
          </div>
        </div>
        <div className=" mb-2 mt-5">
          <label className="font-semibold    ">
            {" "}
            {getLabel()} Fun Activities 
          </label>

          <div className="mt-3">
         
            <Select
              name="fun"
              showSearch
              value={
                      formFive.fun === ""
                        ? ["Open to all"]
                        : formFive.fun
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
              className="w-full custom-select  font-DMsans text-[15px] "
            />
          </div>
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 mb-9">
            {" "}
            {getLabel()} Fitness 
          </label>
          <div className="mt-3">
            {" "}
           
            <Select
              name="interest"
              showSearch
              value={
                      formFive.fitness === ""
                        ? ["Open to all"]
                        : formFive.fitness
                    }
              placeholder="Fitness"
              optionFilterProp="children"
              onChange={(value) => onChange("fitness", value)}
              onSearch={onSearch}
              filterOption={filterOption}
              mode="multiple"
              dropdownRender={dropdownRender("fitness", fitness, "FitnessId")}
              options={fitness.map((fit) => ({
                value: fit.FitnessId,
                label: fit.FitnessName,
              }))}
              className="w-full custom-select  font-DMsans text-[15px]"
            />
          </div>
        </div>

        <div className=" mb-2 mt-5">
          <label className="font-semibold mt-2 mb-9">
            {" "}
            {getLabel()} Other Interests 
          </label>
          <div className="mt-3">
            <Select
              name="other"
              showSearch
              value={
                      formFive.other === ""
                        ? ["Open to all"]
                        : formFive.other
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
              className="w-full custom-select  font-DMsans text-[15px] "
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
