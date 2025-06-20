import axios from "./axios";

export const createRoleRequest = (role) => axios.post("/roles", role);

export const getRolesRequest = () => axios.get("/roles");

export const getRoleRequest = (id) => axios.get("/roles/" + id);

export const updateRoleRequest = (id, role) => axios.put("/roles/" + id, role);
