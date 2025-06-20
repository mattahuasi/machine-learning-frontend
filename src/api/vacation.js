import axios from "./axios";

export const createVacationRequest = (vacation) =>
  axios.post("/vacations", vacation);

export const getVacationsRequest = () => axios.get("/vacations");

export const getVacationRequest = (id) => axios.get("/vacations/" + id);

export const updateVacationRequest = (id, vacation) =>
  axios.put("/vacations/" + id, vacation);

export const deleteVacationRequest = (id) => axios.get("/vacations/" + id);
