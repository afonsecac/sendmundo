import axios from "axios";

const instace = axios.create({
  headers: {
    "X-LANGUAGE": "es",
    Authorization: "Bearer null",
  },
});

export const otherInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default instace;
