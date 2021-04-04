import axios from "axios-or";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token ? token : (localStorage.getItem('token') || null)}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
