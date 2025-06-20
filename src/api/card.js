import axios from "./axios";

export const createCardRequest = (card) => axios.post("/cards", card);

export const getCardsRequest = () => axios.get("/cards");

export const getCardRequest = (id) => axios.get("/cards/" + id);

export const getCardEmployeeRequest = (id) =>
  axios.get("/cards/employee/" + id);

export const getCardTypeEmployeeRequest = (id, userId) =>
  axios.get("/cards/card-types/" + id + "/" + userId);

export const updateCardRequest = (id, card) => axios.put("/cards/" + id, card);

export const connectCardRequest = (id, user) =>
  axios.put("/cards/connect/" + id, user);

export const disconnectCardRequest = (id) =>
  axios.delete("/cards/connect/" + id);

export const disconnectCardEmployeeRequest = (id) =>
  axios.delete("/cards/connect/employees/" + id);

export const deleteCardRequest = (id) => axios.delete("/cards/" + id);
