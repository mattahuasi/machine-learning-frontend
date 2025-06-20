import axios from "./axios";

export const createCardTypeRequest = (card) => axios.post("/card-types", card);

export const getCardTypesRequest = () => axios.get("/card-types");

export const getCardTypeRequest = (id) => axios.get("/card-types/" + id);

export const updateCardTypeRequest = (id, card) =>
  axios.put("/card-types/" + id, card);

export const deleteCardTypeRequest = (id) => axios.delete("/card-types/" + id);
