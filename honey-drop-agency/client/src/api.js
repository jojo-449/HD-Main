// import axios from "axios";

// // This checks if you are running locally or on Render automatically
// const baseURL = window.location.hostname === "localhost" 
//   ? "http://localhost:5001" 
//   : "https://hd-main-4.onrender.com";

// const api = axios.create({
//   baseURL: baseURL,
// });

// export default api;


import axios from "axios";

// This tells the app to use the URL from your .env file
// If the .env file is missing, it falls back to the Render URL
const baseURL = import.meta.env.VITE_API_URL || "https://hd-main-4.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;

