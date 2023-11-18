import axios from "axios";
const BASE_URL = process.env.BASE_URL || "https://taniatestpi.codens.com.br";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});