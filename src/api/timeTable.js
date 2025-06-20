import axios from "./axios";

export const createTimeTableRequest = (timeTable) =>
  axios.post("/time-tables", timeTable);

export const getTimeTablesRequest = () => axios.get("/time-tables/");

export const getTimeTableRequest = (id) => axios.get("/time-tables/" + id);

export const updateTimeTableRequest = (id, timeTable) =>
  axios.put("/time-tables/" + id, timeTable);
