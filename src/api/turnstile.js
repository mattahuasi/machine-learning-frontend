import axios from "./axios";

export const createTurnstileRequest = (turnstile) =>
  axios.post("/turnstiles", turnstile);

export const getTurnstilesRequest = () => axios.get("/turnstiles");

export const getTurnstileRequest = (id) => axios.get("/turnstiles/" + id);

export const updateTurnstileRequest = (id, turnstile) =>
  axios.put("/turnstiles/" + id, turnstile);
