import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://movie-master-server-seven.vercel.app/`,
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
