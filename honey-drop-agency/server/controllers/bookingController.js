const Booking = require('../models/Booking');

// @desc    Create a new booking
const createBooking = async (req, res) => {
  try {
    const { modelName, shootType, date, time, requirements } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      modelName,
      shootType,
      date,
      time,
      requirements,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

// @desc    Get logged in user bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'instagramHandle phoneNumber');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update status (Admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = req.body.status || booking.status;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete booking (Admin only)
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      await booking.deleteOne();
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// --- CRITICAL: MUST EXPORT EVERY FUNCTION ---
module.exports = { 
  createBooking, 
  getBookings, 
  getAllBookings, 
  updateBookingStatus, 
  deleteBooking 
};