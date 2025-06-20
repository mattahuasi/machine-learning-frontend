import axios from "./axios";

export const createEmployeeRequest = (employee) =>
  axios.post("/employees", employee);

export const getEmployeesStaffRequest = () => axios.get("/employees/staff");

export const getEmployeesAdminRequest = () => axios.get("/employees/admin");

export const getEmployeeRequest = (id) => axios.get("/employees/" + id);

export const updateEmployeeRequest = (id, card) =>
  axios.put("/employees/" + id, card);

export const updateStatusEmployeeRequest = (id) =>
  axios.put("/employees/status/" + id);

export const deleteEmployeeRequest = (id) => axios.delete("/employees/" + id);
