const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
const registerUser = async (req, res) => {
  const { instagramHandle, phoneNumber, password } = req.body;

  try {
    // NORMALIZE: remove @ and make lowercase
    const cleanHandle = instagramHandle.toLowerCase().replace('@', '').trim();
    const cleanPhone = phoneNumber.trim();

    const userExists = await User.findOne({ 
      $or: [{ instagramHandle: cleanHandle }, { phoneNumber: cleanPhone }] 
    });

    if (userExists) {
      return res.status(400).json({ message: 'Handle or Phone Number already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      instagramHandle: cleanHandle,
      phoneNumber: cleanPhone,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        instagramHandle: user.instagramHandle,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // NORMALIZE: remove @ and make lowercase
    const cleanIdentifier = identifier.toLowerCase().replace('@', '').trim();

    const user = await User.findOne({
      $or: [{ instagramHandle: cleanIdentifier }, { phoneNumber: cleanIdentifier }]
    });

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        _id: user.id,
        instagramHandle: user.instagramHandle,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };