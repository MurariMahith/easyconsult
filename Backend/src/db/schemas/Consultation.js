const mongoose = require('mongoose');

// Define the Consultation schema
const consultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to a "Patient" model
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to a "Doctor" model
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  // using object rather than object reference fopr consultation
  diagnosis: {
    type: Object,
    ref: 'Diagnosis', // Reference to a "Diagnosis" model
    required: true,
  },
}, {
    strictPopulate: false // Set strictPopulate to false
  });

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;
