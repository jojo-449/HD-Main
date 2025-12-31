// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { submitApplication } = require('../controllers/applicationController');

// // Configure Multer to store files in memory (RAM) temporarily
// const storage = multer.memoryStorage();
// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB per file
// });

// // Route
// // 'photos' matches the name used in formData.append('photos', file) in React
// router.post('/apply', upload.array('photos', 5), submitApplication);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitApplication } = require('../controllers/applicationController');

// Use Memory Storage (Files stored in RAM temporarily for email)
const storage = multer.memoryStorage();

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
});

// Route
// CRITICAL: 'photos' must match the frontend formData name
router.post('/apply', upload.array('photos', 5), submitApplication);

module.exports = router;