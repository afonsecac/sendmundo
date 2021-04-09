import moment from "moment";

export const formatDate = (date, pattern = "Do MMMM YYYY HH:mm") => {
  return moment(date).format(pattern);
};
