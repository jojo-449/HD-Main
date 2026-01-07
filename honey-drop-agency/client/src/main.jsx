// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import './index.css';

// <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// --- 1. IMPORT AXIOS & SET THE SERVER URL GLOBALLY ---
import axios from 'axios';

// This tells your React App: "Whenever you make a request, go to this server"
axios.defaults.baseURL = "https://hd-main-4.onrender.com"; 
// -----------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);