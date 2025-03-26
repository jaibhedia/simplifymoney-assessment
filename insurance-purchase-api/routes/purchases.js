// routes/purchases.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const insurances = require('../data/insurances');
const purchases = require('../data/purchases');

// POST purchase an insurance
router.post('/', (req, res) => {
  const { userId, insuranceId } = req.body;

  // Validation
  if (!userId || !insuranceId) {
    return res.status(400).json({ error: 'userId and insuranceId are required' });
  }

  // Check if insurance exists
  const insurance = insurances.find(ins => ins.id === insuranceId);
  if (!insurance) {
    return res.status(404).json({ error: 'Insurance not found' });
  }

  // Create purchase record
  const purchaseId = uuidv4();
  const purchaseDate = new Date().toISOString();
  const purchase = { purchaseId, userId, insuranceId, purchaseDate };
  purchases.push(purchase);

  res.status(201).json(purchase);
});

// GET policy document for a purchase
router.get('/:purchaseId/policy', (req, res) => {
  const purchaseId = req.params.purchaseId;

  // Check if purchase exists
  const purchase = purchases.find(p => p.purchaseId === purchaseId);
  if (!purchase) {
    return res.status(404).json({ error: 'Purchase not found' });
  }

  // Serve dummy PDF
  const filePath = path.join(__dirname, '../policy.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="policy.pdf"');
  res.sendFile(filePath, err => {
    if (err) {
      res.status(500).json({ error: 'Error serving policy document' });
    }
  });
});

module.exports = router;