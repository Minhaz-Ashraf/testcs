
import apiurl from "../../util";


export const getFormData = async (userId, page) =>
{
  if (!userId)
  {
    throw new Error("User ID is required.");
  }

  try
  {
    const response = await apiurl.get(`/user-data/${ userId }?page=${ page }`);
    const formData = response.data?.pageData;
    console.log({ formData })
    return formData;
  } catch (err)
  {
    console.error("Error fetching form data:", err);
    throw err; // Rethrow the error to handle it elsewhere if needed
  }
};

export const getUser = async (userId) => {
  try {
  const response =   await apiurl.get(
      `/auth/get-user-data-view/${userId}`
    );
    console.log(response.data)
  return response.data
  
  } catch (err) {
    console.log(err);
  }
};