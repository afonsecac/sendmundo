import axios from "axios";

const instace = axios.create({
  headers: {
    "X-LANGUAGE": "es",
    Authorization: "Bearer null",
  },
  // baseURL: "https://api.sendmundo.com",
});

export default instace;
