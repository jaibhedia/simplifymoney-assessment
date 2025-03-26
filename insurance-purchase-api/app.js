// app.js
const express = require('express');
const app = express();
const insuranceRoutes = require('./routes/insurances');
const purchaseRoutes = require('./routes/purchases');

app.use(express.json());

// Mount routes
app.use('/insurances', insuranceRoutes);
app.use('/purchases', purchaseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app; // Export for testing

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}