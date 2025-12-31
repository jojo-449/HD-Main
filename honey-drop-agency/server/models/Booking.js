const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Connects to your User model
  },
  modelName: { type: String, required: true },
  shootType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  requirements: { type: String },
  status: { 
    type: String, 
    default: 'Pending', // Pending, Confirmed, Completed
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);