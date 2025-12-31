// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   instagramHandle: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false // Default is false, change to true manually in DB for the owner later
//   }
// }, {
//   timestamps: true // Automatically adds createdAt and updatedAt
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Premium', 'Basic', 'Top', 'Elite'] 
  },
  height: { type: String, required: true },
  measurements: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL to image
  bookingInfo: { type: String, default: "Contact via WhatsApp for rates." }
}, { timestamps: true });

module.exports = mongoose.model('Model', modelSchema);