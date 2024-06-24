import axios from "axios";

const apiurl = axios.create({
  baseURL: import.meta.env.VITE_APP_DEV_BASE_URL,
  // You can add other default configurations here if needed
});

export default apiurl;
