const mongoose = require('mongoose');

// Define the Prescription schema
const prescriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  notes: String,
  isMedication: Boolean,
  isActivity: Boolean,
  numberOfDays: Number,
  dosage: String,
  when: String,
  isImage: Boolean,
  imageUrl: String,
  isYoutubeVideo: Boolean,
  youtubeLink: String
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;