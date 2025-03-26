const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory storage for insurances and purchases
let insurances = [
  {
    id: '1',
    name: 'Health Insurance',
    description: 'Covers medical expenses',
    premium: 1000,
    coverage: 'Up to $100,000'
  },
  {
    id: '2',
    name: 'Child Education Plan',
    description: 'Savings for child education',
    premium: 500,
    coverage: 'Up to $50,000',
    min_age: 0,
    max_age: 18
  },
  {
    id: '3',
    name: 'Retirement Plan',
    description: 'Savings for retirement',
    premium: 2000,
    coverage: 'Up to $200,000',
    min_age: 50
  },
  {
    id: '4',
    name: "Women's Health Insurance",
    description: 'Health coverage for women',
    premium: 800,
    coverage: 'Up to $80,000',
    gender: 'female'
  },
  {
    id: '5',
    name: 'High-Income Life Insurance',
    description: 'Life coverage for high-income individuals',
    premium: 3000,
    coverage: 'Up to $500,000',
    min_income: 100000
  }
];

let purchases = []; // Stores purchase records

// API Endpoints

// GET /insurances: List all available insurances
app.get('/insurances', (req, res) => {
  res.status(200).json(insurances);
});

// POST /purchases: Purchase an insurance
app.post('/purchases', (req, res) => {
  const { userId, insuranceId } = req.body;

  // Basic validation
  if (!userId || !insuranceId) {
    return res.status(400).json({ error: 'userId and insuranceId are required' });
  }

  // Check if insurance exists
  const insurance = insurances.find(ins => ins.id === insuranceId);
  if (!insurance) {
    return res.status(400).json({ error: 'Insurance not found' });
  }

  // Create purchase record (payment is always successful)
  const purchaseId = uuidv4();
  const purchaseDate = new Date().toISOString();
  const purchase = { purchaseId, userId, insuranceId, purchaseDate };
  purchases.push(purchase);

  // Return purchase receipt
  res.status(201).json(purchase);
});

// GET /purchases/{purchaseId}/policy: Download policy document
app.get('/purchases/:purchaseId/policy', (req, res) => {
  const purchaseId = req.params.purchaseId;

  // Check if purchase exists
  const purchase = purchases.find(p => p.purchaseId === purchaseId);
  if (!purchase) {
    return res.status(404).json({ error: 'Purchase not found' });
  }

  // Serve the dummy PDF file
  const filePath = path.join(__dirname, 'policy.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="policy.pdf"');
  res.sendFile(filePath, err => {
    if (err) {
      res.status(500).json({ error: 'Error serving policy document' });
    }
  });
});

// GET /insurances/curated: List curated insurances based on user details
app.get('/insurances/curated', (req, res) => {
  const { age, gender, income } = req.query;

  // Validate query parameters
  if (!age || !gender || !income) {
    return res.status(400).json({ error: 'age, gender, and income are required' });
  }

  // Convert query params to appropriate types
  const userAge = parseInt(age);
  const userIncome = parseFloat(income);

  // Filter insurances based on curation criteria
  const curatedInsurances = insurances.filter(ins => {
    const ageOk = (!ins.min_age || userAge >= ins.min_age) && (!ins.max_age || userAge <= ins.max_age);
    const genderOk = !ins.gender || ins.gender.toLowerCase() === gender.toLowerCase();
    const incomeOk = !ins.min_income || userIncome >= ins.min_income;
    return ageOk && genderOk && incomeOk;
  });

  res.status(200).json(curatedInsurances);
});

// Start the server
if (require.main === module) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  module.exports = app;