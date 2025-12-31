const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  instagramHandle: { type: String }, 
  
  personalDetails: {
    dateOfBirth: String,
    age: String,
    location: String
  },

  measurements: {
    height: String,
    dressSize: String,
    bust: String,
    waist: String,
    hips: String,
    shoeSize: String,
    hairColor: String,
    eyeColor: String
  },

  experienceDetails: {
    experience: String,
    portfolioLink: String,
    previousWork: String
  },

  // Stores filenames/paths
  photos: [{ type: String }], 

  additionalInfo: {
    motivation: String,
    availability: String
  },

  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected']
  }

}, {
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;