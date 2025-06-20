import axios from "./axios";

export const getEntriesRequest = (init, final) =>
  axios.get("/entries/" + init + "/" + final);

export const getEntriesExitsRequest = (init, final) =>
  axios.get("/entries/exits/" + init + "/" + final);

export const getEntriesUserRequest = (userId) =>
  axios.get("/entries/user/" + userId);

export const getEntryRequest = (id) => axios.get("/entries/" + id);

export const getExitsRequest = (init, final) =>
  axios.get("/exits/" + init + "/" + final);
