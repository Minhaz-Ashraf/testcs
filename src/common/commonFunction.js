import { useSelector } from "react-redux";
import { userDataStore } from "../Stores/slices/AuthSlice";
import apiurl from "../util";

export const fetchData = async (endpoint, params = null) => {
  try {
    let response;
    if (params) {
      response = await apiurl.get(endpoint, { params });
    } else {
      response = await apiurl.get(endpoint);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return [];
  }
};
export const getMasterData = async (type) => {
  try {
    const response = await apiurl.get(`/getMasterData/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return null;
  }
};

// export const getMasterData = async (type) => {
//   return await fetchData(`/getMasterData/${type}`);
// };

export const getCountries = async () => {
  return await fetchData("/countries");
};

export const getStateById = async (stateId) => {
  try {
    const response = await apiurl.get(`/state?state=${stateId}`)

    return response.data;
  } catch (error) {
    console.error('Error fetching state:', error);
    throw error;
  }
};


export const getStatesByCountry = async (selectedCountry) => {
  return await fetchData(`/states`, { country: selectedCountry });
};

export const getCitiesByState = async (selectedCountry, selectedState) => {
  return await fetchData(`/cities`, {
    country: selectedCountry,
    state: selectedState,
  });
};

export const getCountryStateCityName = async (type, id) => {
  if (type && id) {
    try {
      let response = await apiurl.get(`/country-state-city?type=${type}&id=${id}`);
      return response?.data[0];
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      return [];
    }
  }
};


export const getLabel = () => {
  const {userData} = useSelector(userDataStore);
  if (!userData || !userData.createdBy || !userData.createdBy[0]) {
    return "NA";
  }

  const createdForCheck = userData.createdBy[0].createdFor;
  const genderCheck = userData.gender;

  switch (createdForCheck) {
    case "myself":
      return "My";
    case "myson":
    case "mybrother":
      return "His";
    case "mysister":
    case "mydaughter":
      return "Her";
    case "myrelative":
      return genderCheck === "M" ? "His" : "Her";
    case "myfriend":
      return genderCheck === "M" ? "His" : "Her";
    default:
      return "NA";
  }
};

export const getModifieldLabelforInput = () => {
  const {userData} = useSelector(userDataStore);
  if (!userData || !userData.createdBy || !userData.createdBy[0]) {
    return "NA";
  }

  const createdForCheck = userData.createdBy[0].createdFor;
  const genderCheck = userData.gender;

  switch (createdForCheck) {
    case "myself":
      return "I live with my family";
    case "myson":
    case "mybrother":
      return "He lives with his family";
    case "mysister":
    case "mydaughter":
      return "She lives with her family";
    case "myrelative":
      return genderCheck === "M" ? "He lives with his family" : "She lives with her family ";
    case "myfriend":
      return genderCheck === "M" ? "He lives with his family" : "She lives with her family";
    default:
      return "NA";
  }
};