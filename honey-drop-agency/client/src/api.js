import axios from "axios";

// This checks if you are running locally or on Render automatically
const baseURL = window.location.hostname === "localhost" 
  ? "http://localhost:5001" 
  : "https://honeydropempire-2.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;