// // const express = require('express');
// // const dotenv = require('dotenv');
// // const cors = require('cors');
// // const connectDB = require('./config/db');

// // // Load configurations
// // dotenv.config();
// // connectDB();

// // // Import Routes
// // const authRoutes = require('./routes/authRoutes');
// // const bookingRoutes = require('./routes/bookingRoutes');
// // const applicationRoutes = require('./routes/applicationRoutes');

// // const app = express();

// // // Middleware to parse JSON
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));

// // // --- CRITICAL CORS SETUP ---
// // const allowedOrigins = [
// //   "http://localhost:5173",               // Local Development
// //   "http://localhost:5174",               
// //   "https://honeydropempire.xyz",         
// //   "https://www.honeydropempire.xyz",     
// //   "https://hd-main-4.onrender.com",
// //    "https://hd-main-3.onrender.com"// Add your Render URL here too
// // ];

// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin) return callback(null, true);
// //     if (allowedOrigins.indexOf(origin) !== -1) {
// //       callback(null, true);
// //     } else {
// //       console.log("Blocked by CORS:", origin);
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   credentials: true
// // }));

// // // --- ROUTES ---
// // app.use('/api/auth', authRoutes);

// // // CHANGE THIS LINE: from /api/data to /api/bookings
// // app.use('/api/bookings', bookingRoutes); 

// // app.use('/api/application', applicationRoutes);

// // // Health Check
// // app.get('/', (req, res) => {
// //     res.send('Honey Drop Backend is Live & Connected!');
// // });

// // const PORT = process.env.PORT || 5001; 

// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });




// // // 1. The Model Schema
// // const modelSchema = new mongoose.Schema({
// //   name: String,
// //   category: { type: String, enum: ['basic', 'top', 'premium', 'elite'] },
// //   about: String,
// //   height: String,
// //   size: String,
// //   bust: String,
// //   waist: String,
// //   hips: String,
// //   shoe: String,
// //   hair: String,
// //   eyes: String,
// //   images: [String], // Array to store paths to the 4 pictures
// // }, { timestamps: true });

// // const Model = mongoose.model("Model", modelSchema);

// // // 2. The Route to add a model (Ensure you use your Admin Middleware)
// // app.post("/api/models", async (req, res) => {
// //   try {
// //     const newModel = new Model(req.body);
// //     await newModel.save();
// //     res.status(201).json(newModel);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error saving model" });
// //   }
// // });





// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose'); // Added this
// const connectDB = require('./config/db');
// const multer = require("multer"); // Added for images
// const cloudinary = require("cloudinary").v2; // Added for Cloudinary
// const { CloudinaryStorage } = require("multer-storage-cloudinary"); // Added for Cloudinary

// // Load configurations
// dotenv.config();
// connectDB();

// const app = express();

// // --- CLOUDINARY CONFIG ---
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "models",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });
// const upload = multer({ storage: storage });

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // --- CORS SETUP ---
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://honeydropempire.xyz",
//   "https://www.honeydropempire.xyz",
//   "https://hd-main-4.onrender.com",
//   "https://hd-main-3.onrender.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // --- MODEL SCHEMA & DATABASE ---
// const modelSchema = new mongoose.Schema({
//   name: String,
//   category: { type: String, enum: ['basic', 'top', 'premium', 'elite'] },
//   about: String,
//   height: String,
//   size: String,
//   bust: String,
//   waist: String,
//   hips: String,
//   shoe: String,
//   hair: String,
//   eyes: String,
//   images: [String], 
// }, { timestamps: true });

// const Model = mongoose.model("Model", modelSchema);

// // --- ROUTES ---

// // Import existing routes
// const authRoutes = require('./routes/authRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const applicationRoutes = require('./routes/applicationRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes); 
// app.use('/api/application', applicationRoutes);

// // NEW: Route to Add a Model (With 4 images)
// app.post("/api/models", upload.array("images", 4), async (req, res) => {
//   try {
//     const imageUrls = req.files.map(file => file.path); // URLs from Cloudinary
    
//     const newModel = new Model({
//       ...req.body,
//       images: imageUrls
//     });

//     await newModel.save();
//     res.status(201).json({ success: true, model: newModel });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ message: "Error saving model" });
//   }
// });

// // NEW: Route to get models by category (for your frontend pages)
// app.get("/api/models/category/:cat", async (req, res) => {
//   try {
//     const models = await Model.find({ category: req.params.cat });
//     res.json(models);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching models" });
//   }
// });


// // EDIT/UPDATE A MODEL
// app.put("/api/models/:id", upload.array("images", 4), async (req, res) => {
//   try {
//     const updateData = { ...req.body };
    
//     // If new images were uploaded, update the images array
//     if (req.files && req.files.length > 0) {
//       updateData.images = req.files.map(file => file.path);
//     }

//     const updatedModel = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.json({ success: true, model: updatedModel });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating model" });
//   }
// });

// // GET A SINGLE MODEL (To fill the edit form)
// app.get("/api/models/single/:id", async (req, res) => {
//   try {
//     const model = await Model.findById(req.params.id);
//     res.json(model);
//   } catch (error) {
//     res.status(404).json({ message: "Model not found" });
//   }
// });


// // GET ALL MODELS (For Admin Management)
// app.get("/api/models", async (req, res) => {
//   try {
//     const models = await Model.find().sort({ createdAt: -1 }); // Newest models first
//     res.json(models);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching models" });
//   }
// });

// // DELETE A MODEL
// app.delete("/api/models/:id", async (req, res) => {
//   try {
//     await Model.findByIdAndDelete(req.params.id);
//     res.json({ message: "Model deleted from database" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting model" });
//   }
// });


// // Health Check
// app.get('/', (req, res) => {
//     res.send('Honey Drop Backend is Live & Connected!');
// });

// const PORT = process.env.PORT || 5001; 
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




// import { useState, useContext } from "react";
// import api from "../api";
// import AuthContext from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import { toast } from "react-toastify";
// import "./AdminForm.css";

// const AddModel = () => {
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "basic",
//     about: "",
//     height: "",
//     size: "",
//     bust: "",
//     waist: "",
//     hips: "",
//     shoe: "",
//     hair: "",
//     eyes: ""
//   });
  
//   // 1. ADD STATE FOR FILES
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 2. ADD FILE HANDLER
//   const handleFileChange = (e) => {
//     setSelectedFiles(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Check if user is logged in
//     if (!user?.token) return toast.error("Please login again.");
//     // Requirement check
//     if (selectedFiles.length === 0) return toast.error("Please select at least 1 image.");

//     setLoading(true);

//     // 3. USE FORMDATA INSTEAD OF PLAIN OBJECT
//     const data = new FormData();
    
//     // Add text fields to the package
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     // Add images to the package (must match 'images' in server.js)
//     for (let i = 0; i < selectedFiles.length; i++) {
//       data.append("images", selectedFiles[i]);
//     }

//     try {
//       const config = { 
//         headers: { 
//             Authorization: `Bearer ${user.token}`,
//             "Content-Type": "multipart/form-data" // Critical for images
//         } 
//       };

//       await api.post("/api/models", data, config);
//       toast.success("Model added successfully!");
      
//       // Clear form after success
//       window.location.reload(); 

//     } catch (error) {
//       console.error("Submit error:", error);
//       toast.error(error.response?.data?.message || "Failed to add model");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container" style={{ maxWidth: '800px', padding: '20px' }}>
//         <h2 className="history-title">Register New Model</h2>
//         <form onSubmit={handleSubmit} className="booking-form">
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
//             <div>
//               <label>Model Full Name</label>
//               <input type="text" name="name" onChange={handleChange} required />

//               <label>Category</label>
//               <select name="category" onChange={handleChange}>
//                 <option value="basic">Basic Model</option>
//                 <option value="top">Top Model</option>
//                 <option value="premium">Premium Model</option>
//                 <option value="elite">Elite Model</option>
//               </select>

//               <label>About Model</label>
//               <textarea name="about" rows="5" onChange={handleChange} placeholder="Describe the model..."></textarea>
//             </div>

//             <div>
//               <label>Statistics</label>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
//                 <input type="text" name="height" placeholder="Height" onChange={handleChange} />
//                 <input type="text" name="size" placeholder="Size" onChange={handleChange} />
//                 <input type="text" name="bust" placeholder="Bust" onChange={handleChange} />
//                 <input type="text" name="waist" placeholder="Waist" onChange={handleChange} />
//                 <input type="text" name="hips" placeholder="Hips" onChange={handleChange} />
//                 <input type="text" name="shoe" placeholder="Shoe" onChange={handleChange} />
//                 <input type="text" name="hair" placeholder="Hair" onChange={handleChange} />
//                 <input type="text" name="eyes" placeholder="Eyes" onChange={handleChange} />
//               </div>

//               <label style={{ marginTop: '15px' }}>Upload Pictures</label>
//               {/* 4. ATTACH THE FILE HANDLER */}
//               <input type="file" multiple accept="image/*" onChange={handleFileChange} required />
//               <small>Max 4 images allowed</small>
//             </div>
//           </div>

//           <button type="submit" className="login-btn" style={{ marginTop: '20px' }} disabled={loading}>
//             {loading ? "Uploading to Cloudinary..." : "Add Model to Website"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddModel;


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();
connectDB();

const app = express();

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "models",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- CORS ---
const allowedOrigins = [
  "http://localhost:5173", "http://localhost:5174",
  "https://honeydropempire.xyz", "https://www.honeydropempire.xyz",
  "https://hd-main-4.onrender.com", "https://hd-main-3.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// --- MODEL SCHEMA ---
const modelSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['basic', 'top', 'premium', 'elite'] },
  about: String,
  height: String,
  size: String,
  bust: String,
  waist: String,
  hips: String,
  shoe: String,
  hair: String,
  eyes: String,
  images: [String], 
}, { timestamps: true });

const Model = mongoose.model("Model", modelSchema);

// --- ROUTES ---
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes); 
app.use('/api/application', applicationRoutes);

// FIXED: Added a check for req.files to prevent 'map' crash
app.post("/api/models", upload.array("images", 4), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images were uploaded" });
    }

    const imageUrls = req.files.map(file => file.path); 
    
    const newModel = new Model({
      ...req.body,
      images: imageUrls
    });

    await newModel.save();
    res.status(201).json({ success: true, model: newModel });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Internal Server Error during upload" });
  }
});

// GET MODELS BY CATEGORY
app.get("/api/models/category/:cat", async (req, res) => {
  try {
    const models = await Model.find({ category: req.params.cat });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: "Error fetching models" });
  }
});

// GET ALL MODELS
app.get("/api/models", async (req, res) => {
  try {
    const models = await Model.find().sort({ createdAt: -1 });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: "Error fetching models" });
  }
});

// DELETE MODEL
app.delete("/api/models/:id", async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: "Model deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting model" });
  }
});


// EDIT/UPDATE A MODEL
app.put("/api/models/:id", upload.array("images", 4), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // If you uploaded new images, update them. If not, it keeps the old ones.
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    const updatedModel = await Model.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedModel) return res.status(404).json({ message: "Model not found" });
    
    res.json({ success: true, model: updatedModel });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating model info" });
  }
});

app.get('/', (req, res) => res.send('Honey Drop Backend is Live!'));

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));