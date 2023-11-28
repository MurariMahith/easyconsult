const { Router } = require('express');
const Diagnosis = require('../db/schemas/Diagnosis');

const diagnosisRouter = Router();

// Get all diagnoses
diagnosisRouter.get('/', async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find();
    res.status(200).json(diagnoses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

diagnosisRouter.get('/all', async (req, res) => {
    try {
      const diagnoses = await Diagnosis.find().populate('prescription');
      res.status(200).json(diagnoses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Create a new diagnosis
diagnosisRouter.post('/create', async (req, res) => {
  try {
    const { diseaseName, symptoms, prescription } = req.body;
    
    const newDiagnosis = new Diagnosis({
      diseaseName,
      symptoms,
      prescription,
    });

    const savedDiagnosis = await newDiagnosis.save();
    res.status(201).json(savedDiagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

diagnosisRouter.post('/createmultiple', async (req, res) => {
  try {
    const diagnosesData = req.body;

    // If the request body is an array, create multiple diagnoses
    if (Array.isArray(diagnosesData)) {
      const createdDiagnoses = await Diagnosis.create(diagnosesData);
      res.status(201).json(createdDiagnoses);
    } else {
      // If the request body is a single object, create a single diagnosis
      const { diseaseName, symptoms, prescription } = diagnosesData;
      const newDiagnosis = new Diagnosis({
        diseaseName,
        symptoms,
        prescription,
      });

      const savedDiagnosis = await newDiagnosis.save();
      res.status(201).json(savedDiagnosis);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

diagnosisRouter.put('/:id', async (req, res) => {
  const { prescription} = req.body;

  try {
    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(
      req.params.id,
      {

        prescription,

      },
      { new: true } // Return the updated document
    );

    if (!updatedDiagnosis) {
      return res.status(404).json({ error: 'Diagnosis not found' });
    }

    res.status(200).json(updatedDiagnosis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = diagnosisRouter;
