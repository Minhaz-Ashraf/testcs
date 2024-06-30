import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFileUpload, FaUser } from "react-icons/fa";
import Header from "../../components/Header";
import { BackArrow } from "../../components/DataNotFound";
import { useSelector } from "react-redux";
import { userDataStore } from "../../Stores/slices/AuthSlice";
import { getFormData } from "../../Stores/service/Genricfunc";
import { FaRegCircleUser } from "react-icons/fa6";
import apiurl from "../../util";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageEdit = () => {
  const { userData, userId } = useSelector(userDataStore);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);

  const [editImage, setEditImage] = useState({
    userPhotos: [],
    userPhotosKeys: [],
    profilePicture: "",
    profilePictureIndex: "",
    profilePictureKey: "",
  });
  const [latestImages, setLatestImages] = useState([]);
  const [showUrlProfile, setShowUrlProfile] = useState(true);
  const [profilePictureIndex, setProfilePictureIndex] = useState(-1);
  const [activeExistingImageIndex, setActiveExistingImageIndex] = useState(-1); 
  const [activeNewImageIndex, setActiveNewImageIndex] = useState(-1); 
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const [formErrors, setFormErrors] = useState({
  
    profilePicture: "",
   
  });
  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

 
    if (!editImage.profilePicture) {
      errors.profilePicture = "Profile Picture is required";
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };
  const handleAddUserImage = async () => {
    setLoading(true);
    const formData = new FormData();
    latestImages.forEach((photo) => {
      formData.append("userPhotos", photo);
    });
    formData.append("userPhotosKeys", editImage.userPhotosKeys);
    if (editImage.profilePictureIndex !== "") {
      formData.append("profilePictureIndex", editImage.profilePictureIndex);
    } else if (editImage.profilePictureKey !== "") {
      formData.append("profilePictureKey", editImage.profilePictureKey);
    }
    if (!validateForm()) {
      toast.error("Please select one image as your profile picture");
      return;
    }
    try {
      setLoading(true);
      const response = await apiurl.put(
        `/user-image-upload/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image updated successfully");
    
      navigate("/user-dashboard");
      window.location.reload();

    } catch (err) {
    if(err){

      setLoading(false);
      }
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };
  console.log(editImage);

  const handleDeleteUserImage = async (key) => {
    try {
      await apiurl.put(`/user-image-delete/${userId}`, { imageKey: key });
      FetchData();
    } catch (err) {
      // console.log(err);
    }
  };




 

  const handleInput = (e) => {
    const { name, value } = e.target;
    const selectedFiles = e.target.files;
  
    if (name === "userPhotos") {
      const currentImagesCount = latestImages.length;
  
      // Check if adding the new images will exceed the limit of 5
      if (currentImagesCount + selectedFiles.length > 5) {
        toast.error('You cannot upload more than 5 images.');
        return;
      }
  
      const newImages = [];
      let invalidFile = false;
  
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
  
        if (file.size > 15 * 1024 * 1024) { // Check if the file size exceeds 15MB
          toast.error(`File ${file.name} exceeds the 15MB size limit.`);
          invalidFile = true;
          continue;
        }
  
        newImages.push(file);
      }
  
      if (newImages.length === 0 && invalidFile) {
        toast.error('Please select at least one valid image.');
      } else {
        setLatestImages((prev) => {
          const combinedImages = [...prev, ...newImages];
          if (combinedImages.length > 5) {
            toast.error('You cannot upload more than 5 images.');
            return prev;
          }
          return combinedImages;
        });
      }
    } else {
      // Handle other input fields
      setEditImage((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };
  



  console.log(latestImages);

  const FetchData = async () => {
  
    try {
      const formData = await getFormData(userId, 5);
      setEditImage(() => ({
        userPhotos: formData.selfDetails.userPhotosUrl,
        userPhotosKeys: formData.selfDetails.userPhotos,
        profilePicture: formData.selfDetails.profilePictureUrl,
        profilePictureKey: formData.selfDetails.profilePicture,
      }));
      const profilePictureIndexInUserPhotos =
        formData.selfDetails.userPhotosUrl.findIndex(
          (url) => url === formData.selfDetails.profilePictureUrl
        );
      if (profilePictureIndexInUserPhotos !== -1) {
        setProfilePictureIndex(profilePictureIndexInUserPhotos);
        setActiveExistingImageIndex(profilePictureIndexInUserPhotos); // Set active existing image index
      } else {
        // Check if profilePicture matches any of the latestImages
        const profilePictureIndexInLatestImages = latestImages.findIndex(
          (image) =>
            URL.createObjectURL(image) ===
            formData.selfDetails.profilePictureUrl
        );
        if (profilePictureIndexInLatestImages !== -1) {
          setProfilePictureIndex(profilePictureIndexInLatestImages);
          setActiveNewImageIndex(profilePictureIndexInLatestImages); // Set active new image index
        }
      }
      if (formData.selfDetails.profilePictureUrl) {
        setShowUrlProfile(true);
      }
      
      console.log(formData);
    } catch (err) {
      console.log(err);
      setIsLoading(false); // Ensure loading state is set to false on error
    }
  };

  useEffect(() => {
    FetchData();
  }, [userId]);

  const handleDeleteImage = (index, arrayType) => {
    if (arrayType === "latestImages") {
      const updatedImages = [...latestImages].filter(
        (image, ind) => ind !== index
      );

      console.log({ updatedImages });
      setLatestImages(updatedImages);
    } else {
      const updatedImages = [...editImage.userPhotos].filter(
        (image, ind) => ind !== index
      );
      console.log({ updatedImages });
      setEditImage((prev) => ({
        ...prev,
        userPhotos: updatedImages,
      }));
    }
  };

  const handleChooseProfileImage = (index, arrayType) => {
    console.log(arrayType);
    if (arrayType === "latestImages") {
      setEditImage({
        ...editImage,
        profilePictureIndex: index,
        profilePicture: latestImages[index],
        profilePictureKey: "",
      });
      setShowUrlProfile(false);
      setActiveNewImageIndex(index);
      setActiveExistingImageIndex(-1); // Reset active existing image index
    } else {
      setEditImage({
        ...editImage,
        profilePicture: editImage.userPhotos[index],
        profilePictureKey: editImage.userPhotosKeys[index],
        profilePictureIndex: "",
      });
      setShowUrlProfile(true);
      setActiveExistingImageIndex(index);
      setActiveNewImageIndex(-1); // Reset active new image index
    }
    setProfilePictureIndex(index);
    setActiveImageIndex(index);
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <div className="md:mx-52 mx-6 mt-36">
          <Skeleton height={600} />
        </div>
      ) : (
        <>
          <BackArrow className="absolute md:ml-24 md:mt-32 sm:mt-28 md:w-52 w-full" />
          <div className="shadow rounded-xl md:mx-52 mx-6 py-12 my-5 font-DMsans md:mt-40 sm:mt-48 mt-36 mb-36 ">
            <div className="md:px-16 px-6">
              <div className="font-semibold mb-9 text-primary">My photos</div>
              <div className="flex flex-col">
                <span className="">
                  <label
                    htmlFor="images"
                    className="drop-container flex justify-start w-60 items-center border border-[#CC2E2E]"
                    id="dropcontainer"
                  >
                    <span className="drop-title text-primary">
                      Upload a Photo
                    </span>
                    <span className="flex items-center justify-center text-primary">
                      <FaFileUpload size={50} />
                    </span>
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      name="userPhotos"
                      onChange={(e) => handleInput(e)}
                      required
                    />
                  </label>
                </span>

                <p className="pt-5 text-[13px]">
                  ( Add a minimum of 1 or a maximum of 5 high-quality(max 15MB each) images.
                  Select 1 image as your thumbnail image. Your thumbnail image
                  will be visible to everyone. Once you permit other profiles,
                  then your entire profile will get unlocked & visible to the
                  other members)
                </p>
              </div>
              <hr className="mt-5 border border-[#e2e2e2]" />
              <div className="flex mt-5 flex-wrap"></div>

              <p className="mt-6">Your Photos</p>
              <span className="flex flex-wrap items-center gap-6 mt-2">
                {editImage.userPhotos.map((selectedImage, index) => (
                  <span key={index}>
                    <img
                      src={selectedImage}
                      className={`md:w-[20vh] md:h-[20vh] w-36 h-36 rounded-xl ${
                        activeExistingImageIndex === index
                          ? "border-2 border-primary p-1"
                          : ""
                      }`}
                      alt={`Selected Image ${index + 1}`}
                      loading="lazy"
                    />
                    <span className="flex mt-5 items-center justify-center gap-2">
                      <div className="px-6 py-1 border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary">
                        <RiDeleteBin6Line
                          onClick={() => {
                            handleDeleteUserImage(
                              editImage.userPhotosKeys[index]
                            );
                            handleDeleteImage(index, "editImage");
                          }}
                          size={20}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleChooseProfileImage(index, "editImage")
                        }
                        className={`px-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary ${
                          activeExistingImageIndex === index
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        <FaRegCircleUser />
                      </button>
                    </span>
                  </span>
                ))}
                {latestImages.map((selectedImage, index) => (
                  <span key={index}>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      className={`w-[20vh] h-[20vh] rounded-xl border border-primary ${
                        activeNewImageIndex === index
                          ? "border-2 border-primary p-1"
                          : ""
                      }`}
                      alt={`Selected Image ${index + 1}`}
                      loading="lazy"
                    />
                    <span className="flex mt-5 gap-2 items-center justify-center">
                      <div className="px-6 py-1 border cursor-pointer border-primary hover:bg-primary hover:text-white rounded-xl text-primary">
                        <RiDeleteBin6Line
                          onClick={() => {
                            handleDeleteImage(index, "latestImages");
                          }}
                          size={20}
                        />
                      </div>
                      <button
                        onClick={() =>
                          handleChooseProfileImage(index, "latestImages")
                        }
                        className={`px-6 py-1 border cursor-pointer text-[20px] border-primary hover:bg-primary hover:text-white rounded-xl text-primary ${
                          activeNewImageIndex === index
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        <FaRegCircleUser />
                      </button>
                    </span>
                  </span>
                ))}
              </span>
              <span className="flex justify-end items-center gap-5 mt-11">
                <Link to="/user-dashboard">
                  <span className="border border-primary px-6 py-2 rounded-md text-primary cursor-pointer">
                    Cancel
                  </span>
                </Link>
                <span
                  onClick={handleAddUserImage}
                  className="px-6 py-2 rounded-md cursor-pointer bg-primary text-white"
                >
                  {loading === true ? "Updating..." : "Update"}
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImageEdit;
