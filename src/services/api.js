import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getEmployees = () => API.get("/users");
export const getEmployeeById = (id) => API.get(`/users/${id}`);
