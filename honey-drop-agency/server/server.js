const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load configurations
dotenv.config();
connectDB();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- CRITICAL CORS SETUP ---
const allowedOrigins = [
  "http://localhost:5173",               // Local Development
  "http://localhost:5174",               
  "https://honeydropempire.xyz",         
  "https://www.honeydropempire.xyz",     
  "https://hd-main-4.onrender.com" // Add your Render URL here too
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// --- ROUTES ---
app.use('/api/auth', authRoutes);

// CHANGE THIS LINE: from /api/data to /api/bookings
app.use('/api/bookings', bookingRoutes); 

app.use('/api/application', applicationRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Honey Drop Backend is Live & Connected!');
});

const PORT = process.env.PORT || 5001; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});