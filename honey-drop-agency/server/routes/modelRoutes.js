// const express = require('express');
// const router = express.Router();
// const Model = require('../models/Model');

// // Update a model
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, category, height, measurements, bookingInfo, images } = req.body;

//     // Find the model by ID
//     const model = await Model.findById(req.params.id);
//     if (!model) return res.status(404).json({ message: "Model not found" });

//     // Update fields
//     if (name) model.name = name;
//     if (category) model.category = category;
//     if (height) model.height = height;
//     if (measurements) model.measurements = measurements;
//     if (bookingInfo) model.bookingInfo = bookingInfo;
//     if (images) model.images = images; // Replace or add images

//     await model.save();
//     res.json(model);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const Model = require('../models/Model'); // Import the model once from the separate file

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

// // 1. ADD NEW MODEL
// router.post("/", upload.array("images", 4), async (req, res) => {
//   try {
//     const imageUrls = req.files ? req.files.map(file => file.path) : (req.body.images || []);
//     const newModel = new Model({ ...req.body, images: imageUrls });
//     await newModel.save();
//     res.status(201).json({ success: true, model: newModel });
//   } catch (error) {
//     res.status(500).json({ message: "Upload Error", error: error.message });
//   }
// });

// // 2. GET ALL MODELS
// router.get("/", async (req, res) => {
//   try {
//     const models = await Model.find().sort({ createdAt: -1 });
//     res.json(models);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching models" });
//   }
// });

// // 3. GET SINGLE MODEL
// router.get("/:id", async (req, res) => {
//   try {
//     const model = await Model.findById(req.params.id);
//     if (!model) return res.status(404).json({ message: "Model not found" });
//     res.json(model);
//   } catch (error) {
//     res.status(500).json({ message: "Invalid ID format" });
//   }
// });

// // 4. EDIT MODEL (PUT)
// router.put("/:id", upload.array("images", 4), async (req, res) => {
//   try {
//     const updateData = { ...req.body };
//     if (req.files && req.files.length > 0) {
//       updateData.images = req.files.map(file => file.path);
//     }
//     const updatedModel = await Model.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     res.json({ success: true, model: updatedModel });
//   } catch (error) {
//     res.status(500).json({ message: "Update Error" });
//   }
// });

// // 5. DELETE MODEL
// router.delete("/:id", async (req, res) => {
//   try {
//     await Model.findByIdAndDelete(req.params.id);
//     res.json({ message: "Model deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting model" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Model = require('../models/Model');

// 1. CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. MULTER STORAGE CONFIG (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hd_agency_models", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage: storage });

// --- ROUTES ---

// @route   POST /api/models
// @desc    Add a new model
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    
    const newModel = new Model({
      ...req.body,
      images: imageUrls
    });

    await newModel.save();
    res.status(201).json({ success: true, model: newModel });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Error creating model", error: error.message });
  }
});

// @route   GET /api/models
// @desc    Get all models
router.get("/", async (req, res) => {
  try {
    const models = await Model.find().sort({ createdAt: -1 });
    res.json(models);
  } catch (error) {
    res.status(500).json({ message: "Error fetching models" });
  }
});

// @route   GET /api/models/:id
// @desc    Get a single model by ID
router.get("/:id", async (req, res) => {
  try {
    const model = await Model.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format" });
  }
});

// @route   PUT /api/models/:id
// @desc    Update model (Manage multiple images & removal)
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // --- IMAGE RECONCILIATION LOGIC ---
    let finalImages = [];

    // 1. Check for existing images sent from the frontend (the ones NOT deleted)
    if (req.body.existingImages) {
      // If only 1 image is kept, it arrives as a string. If multiple, it arrives as an array.
      // We normalize it into an array.
      finalImages = Array.isArray(req.body.existingImages) 
        ? req.body.existingImages 
        : [req.body.existingImages];
    }

    // 2. Add any newly uploaded images from Cloudinary
    if (req.files && req.files.length > 0) {
      const newImageUrls = req.files.map(file => file.path);
      finalImages = [...finalImages, ...newImageUrls];
    }

    // 3. Apply the updated image list to the update object
    // If no images are left and no new ones were added, it remains an empty array
    updateData.images = finalImages;

    // 4. Update the database
    const updatedModel = await Model.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );
    
    if (!updatedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    
    res.json({ success: true, model: updatedModel });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error during update", error: error.message });
  }
});

// @route   DELETE /api/models/:id
// @desc    Delete a model
router.delete("/:id", async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    
    res.json({ success: true, message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting model" });
  }
});

module.exports = router;