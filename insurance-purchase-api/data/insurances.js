// data/insurances.js
module.exports = [
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
      minAge: 0,
      maxAge: 18
    },
    {
      id: '3',
      name: 'Retirement Plan',
      description: 'Savings for retirement',
      premium: 2000,
      coverage: 'Up to $200,000',
      minAge: 50
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
      minIncome: 100000
    }
  ];