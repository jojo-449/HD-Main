const express = require('express');
const router = express.flatten? express.Router() : express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;