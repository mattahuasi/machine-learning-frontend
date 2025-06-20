import axios from "./axios";

export const getTotalRequest = (date) => axios.get("/stats/total/" + date);

export const getEntryHourRequest = (date) =>
  axios.get("/stats/entry-hour/" + date);

export const getEmployeesRequest = () => axios.get("/stats/employees/");

export const getCardsRequest = () => axios.get("/stats/cards");
