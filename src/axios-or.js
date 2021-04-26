import axios from "axios";

const instace = axios.create({
  baseURL: "https://api.sendmundo.com",
});

instace.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "X-LANGUAGE": "es",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location = "/";
    } else return Promise.reject(error);
  }
);

export const otherInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default instace;
