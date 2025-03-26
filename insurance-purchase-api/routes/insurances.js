// routes/insurances.js
const express = require('express');
const router = express.Router();
const insurances = require('../data/insurances');

// GET all insurances
router.get('/', (req, res) => {
  res.json(insurances);
});

// GET curated insurances based on query params
router.get('/curated', (req, res) => {
  const { age, gender, income } = req.query;

  // Basic validation
  if (!age || !gender || !income) {
    return res.status(400).json({ error: 'age, gender, and income are required' });
  }

  // Convert to appropriate types
  const userAge = parseInt(age);
  const userIncome = parseFloat(income);

  // Filter insurances based on criteria
  const curated = insurances.filter(ins => {
    const ageOk = (!ins.minAge || userAge >= ins.minAge) && (!ins.maxAge || userAge <= ins.maxAge);
    const genderOk = !ins.gender || ins.gender.toLowerCase() === gender.toLowerCase();
    const incomeOk = !ins.minIncome || userIncome >= ins.minIncome;
    return ageOk && genderOk && incomeOk;
  });

  res.json(curated);
});

module.exports = router;